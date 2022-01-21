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
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: inputCode,
        }
      })

      // Global check for pkg file in cache
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // Check to see if file has been fetched & it is in cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        )

        // If file is in cache, return immediately
        if (cachedResult) {
          return cachedResult
        }
      })

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path)

        // remove newlines and escape double/single quotes in css string
        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'")

        // workaround to esbuild functionality
        // i.e. how to get css into JS head tag
        const contents = /*javascript*/ `
            const style = document.createElement('style')
            style.innerText = '${escaped}'
            document.head.appendChild(style)
          `

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        }
        // Store response in cache
        await fileCache.setItem(args.path, result)

        return result
      })

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path)

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        }
        // Store response in cache
        await fileCache.setItem(args.path, result)

        return result
      })
    },
  }
}
