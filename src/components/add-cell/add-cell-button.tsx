import './add-cell.css'

interface AddCellButtonProps {
  onClick: () => void
  type: string
}

const AddCellButton: React.FC<AddCellButtonProps> = ({ onClick, type }) => {
  return (
    <button
      className='button is-rounded is-primary is-active is-small'
      onClick={onClick}
    >
      <span className='icon is-medium'>
        <i className='cell-btn-icon fas fa-plus' />
      </span>
      <span className='cell-btn-type'>{type}</span>
    </button>
  )
}

export default AddCellButton
