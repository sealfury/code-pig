import * as esbuild from 'esbuild-wasm'
import { unpkgPathPlugin, fetchPlugin } from '../plugins'

let service: esbuild.Service

export default async (codeInput: string) => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      // externally fetch web assembly binary
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    })
  }

  const result = await service.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(codeInput)],
    define: {
      // aka str 'production', not var named production
      'process.env.NODE_ENV': '"production"',
      // replaces var global with window for browser (webpack does automatically)
      global: 'window',
    },
  })

  return result.outputFiles[0].text
}
