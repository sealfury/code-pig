import './text-editor.css'
import { useState, useEffect, useRef } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { Cell } from '../../state'
import { useActions } from '../../hooks/use-actions'

interface TextEditorProps {
  cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const { updateCell } = useActions()

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        console.log('element clicked is inside editor')
        return
      }

      console.log('element clicked is NOT inside editor')

      setIsEditing(false)
    }
    document.addEventListener('click', listener, { capture: true })

    return () => {
      document.removeEventListener('click', listener, { capture: true })
    }
  }, [])

  if (isEditing) {
    return (
      <div className='text-editor' ref={ref}>
        <MDEditor
          value={cell.content}
          onChange={v => updateCell(cell.id, v || '')}
        />
      </div>
    )
  }

  return (
    <div className='text-editor card' onClick={() => setIsEditing(true)}>
      <div className='card-content'>
        <MDEditor.Markdown source={cell.content || 'Click here to edit!'} />
      </div>
    </div>
  )
}

export default TextEditor
