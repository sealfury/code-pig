import './action-bar.css'
import { useActions } from '../../hooks'
import ActionButton from './action-button'

interface ActionBarProps {
  id: string
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions()

  return (
    <div className='action-bar'>
      <ActionButton
        className='fas fa-arrow-up'
        onClick={() => moveCell(id, 'up')}
      />
      <ActionButton
        className='fas fa-arrow-down'
        onClick={() => moveCell(id, 'down')}
      />
      <ActionButton
        className='fas fa-trash-alt'
        onClick={() => deleteCell(id)}
      />
    </div>
  )
}

export default ActionBar
