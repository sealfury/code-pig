import './text-editor.css'
import { useState, useEffect, useRef } from 'react'
import MDEditor from '@uiw/react-md-editor'

const TextEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState('# Header')

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
        <MDEditor value={value} onChange={v => setValue(v || '')} />
      </div>
    )
  }

  return (
    <div className='text-editor' onClick={() => setIsEditing(true)}>
      <MDEditor.Markdown source={value} />
    </div>
  )
}

export default TextEditor
