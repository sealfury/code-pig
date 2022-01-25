import { useState, useEffect } from 'react'
import { CodeEditor, Preview, Resizable } from '..'
import { bundle } from '../../bundler'

const CodeCell = () => {
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')
  const [err, setErr] = useState('')

  // auto-bundle user code after 0.8s
  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input)
      setCode(output.code)
      setErr(output.err)
    }, 800)

    return () => {
      clearTimeout(timer)
    }
  }, [input])

  return (
    <Resizable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue='// Start writing some code!'
            onChange={val => setInput(val)}
          />
        </Resizable>
        <Preview code={code} bundleErr={err} />
      </div>
    </Resizable>
  )
}

export default CodeCell
