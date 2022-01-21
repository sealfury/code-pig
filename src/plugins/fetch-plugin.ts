import * as esbuild from 'esbuild-wasm'
import axios from 'axios'
import localforage from 'localforage'

const fileCache = localforage.createInstance({
  name: 'file-cache',
})

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: inputCode,
          }
        }

        // Check to see if file has been fetched & it is in cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        )

        // If file is in cache, return immediately
        if (cachedResult) {
          return cachedResult
        }

        const { data, request } = await axios.get(args.path)

        const fileType = args.path.match(/.css$/) ? 'css' : 'jsx'

        // workaround to esbuild functionality
        // i.e. how to get css into JS head tag
        const contents =
          fileType === 'css'
            ? /*javascript*/ `
            const style = document.createElement('style')
            style.innerText = 'body { background-color: "red" }'
            document.head.appendChild(style)
          `
            : data

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        }
        // Store response in cache
        await fileCache.setItem(args.path, result)

        return result
      })
    },
  }
}
