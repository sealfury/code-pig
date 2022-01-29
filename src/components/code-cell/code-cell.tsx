import './code-cell.css'
import { useEffect } from 'react'
import { CodeEditor, Preview, Resizable } from '..'
import { Cell } from '../../state'
import { useActions, useCumulativeCode, useTypedSelector } from '../../hooks'

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions()
  const bundle = useTypedSelector(state => state.bundles[cell.id])
  const cumulativeCode = useCumulativeCode(cell.id)

  // auto-bundle user code after 0.8s
  // if there is no bundle, immediately create it
  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode)
      return
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode)
    }, 800)

    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, createBundle])

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
        <div className='progress-container'>
          {!bundle || bundle.loading ? (
            <div className='progress-wrapper'>
              <progress
                className='progress is-normal is-warning is-inverted'
                max='100'
              >
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} bundleErr={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  )
}

export default CodeCell
