import * as esbuild from 'esbuild-wasm'
import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

import { unpkgPathPlugin, fetchPlugin } from './plugins'

const App = () => {
  const ref = useRef<any>()
  const iframe = useRef<any>()

  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      // externally fetch web assembly binary
      // return to local usage from public folder
      // if necessary - see PR #1
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    })
  }
  useEffect(() => {
    startService()
  }, [])

  const onClick = async () => {
    if (!ref.current) {
      return
    }

    // reset contents of iframe after submit
    iframe.current.srcdoc = html

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        // aka str 'production', not var named production
        'process.env.NODE_ENV': '"production"',
        // replaces var global with window for browser (webpack does automatically)
        global: 'window',
      },
    })

    // setCode(result.outputFiles[0].text)
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*')
  }

  // Google chrome no longer allows this
  // Figure out how to fix it
  const html = /*html*/ `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
            window.addEventListener('message', (event) => {
              try {
                eval(event.data)
              } catch (err) {
                const root = document.querySelector('#root')
                root.innerHTML = 
                  '<div style="color: #ff0d5d;"><h3>Runtime Error</h3>' + err + '</div>'
                console.error(err)
              }
            }, false)
        </script>
      </body>
    </html>
  `

  return (
    <div>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
      <iframe ref={iframe} sandbox='allow-scripts' srcDoc={html} />
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
