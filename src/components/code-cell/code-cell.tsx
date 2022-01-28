import './code-cell.css'
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
  const cumulativeCode = useTypedSelector(state => {
    const { data, order } = state.cells
    const orderedCells = order.map(id => data[id])

    const cumulativeCode = []
    for (let c of orderedCells) {
      if (c.type === 'code') {
        cumulativeCode.push(c.content)
      }
      if (c.id === cell.id) {
        break
      }
    }
    return cumulativeCode
  })

  // auto-bundle user code after 0.8s
  // if there is no bundle, immediately create it
  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode.join('\n'))
      return
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode.join('\n'))
    }, 800)

    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode.join('\n'), cell.id, createBundle])

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
