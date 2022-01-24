import { useState } from 'react'
import { CodeEditor, Preview, Resizable } from '..'
import { bundle } from '../../bundler'

const CodeCell = () => {
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const onClick = async () => {
    const output = await bundle(input)
    setCode(output)
  }

  return (
    <Resizable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row'}}>
        <CodeEditor
          initialValue='// Start writing some code!'
          onChange={val => setInput(val)}
        />
        {/* <div>
          <button onClick={onClick}>Submit</button>
        </div> */}
        <Preview code={code} />
      </div>
    </Resizable>
  )
}

export default CodeCell
