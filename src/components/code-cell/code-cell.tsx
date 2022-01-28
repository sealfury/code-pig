import { useEffect } from 'react'
import { CodeEditor, Preview, Resizable } from '..'
import { Cell } from '../../state'
import { useActions, useTypedSelector } from '../../hooks'

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions()
  const bundle = useTypedSelector(state => state.bundles[cell.id])

  // auto-bundle user code after 0.8s
  // if there is no bundle, immediately create it
  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cell.content)
      return
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content)
    }, 800)

    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.content, cell.id, createBundle])

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
        {/* don't bundle code before app has loaded */}
        {bundle && <Preview code={bundle.code} bundleErr={bundle.err} />}
      </div>
    </Resizable>
  )
}

export default CodeCell
