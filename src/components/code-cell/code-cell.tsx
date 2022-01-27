import { useState, useEffect } from 'react'
import { CodeEditor, Preview, Resizable } from '..'
import { bundle } from '../../bundler'
import { Cell } from '../../state'
import { useActions } from '../../hooks/use-actions'

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState('')
  const [err, setErr] = useState('')
  const { updateCell } = useActions()

  // auto-bundle user code after 0.8s
  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content)
      setCode(output.code)
      setErr(output.err)
    }, 800)

    return () => {
      clearTimeout(timer)
    }
  }, [cell.content])

  return (
    <Resizable direction='vertical'>
      <div
        style={{
          height: 'calc(100% - 14px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={val => updateCell(cell.id, val)}
          />
        </Resizable>
        <Preview code={code} bundleErr={err} />
      </div>
    </Resizable>
  )
}

export default CodeCell
