import './add-cell.css'
import { useActions } from '../../hooks'
import AddCellButton from './add-cell-button'

interface AddCellProps {
  nextCellId: string | null
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
  const { insertCellBefore } = useActions()

  return (
    <div className='add-cell'>
      <div className='add-buttons'>
        <AddCellButton
          onClick={() => insertCellBefore(nextCellId, 'code')}
          type='Code'
        />
        <AddCellButton
          onClick={() => insertCellBefore(nextCellId, 'text')}
          type='Text'
        />
        <div className='divider'></div>
      </div>
    </div>
  )
}

export default AddCell
