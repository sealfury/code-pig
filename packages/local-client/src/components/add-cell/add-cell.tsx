import './add-cell.css'
import { useActions } from '../../hooks'
import AddCellButton from './add-cell-button'

interface AddCellProps {
  prevCellId: string | null
  forceVisible?: boolean
}

const AddCell: React.FC<AddCellProps> = ({ prevCellId, forceVisible }) => {
  const { insertCellAfter } = useActions()

  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className='add-buttons'>
        <AddCellButton
          onClick={() => insertCellAfter(prevCellId, 'code')}
          type='Code'
        />
        <AddCellButton
          onClick={() => insertCellAfter(prevCellId, 'text')}
          type='Text'
        />
        <div className='divider'></div>
      </div>
    </div>
  )
}

export default AddCell
