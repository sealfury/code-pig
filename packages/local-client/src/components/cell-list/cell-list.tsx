import './cell-list.css'
import { Fragment, useEffect } from 'react'
import { useTypedSelector, useActions } from '../../hooks'
import CellListItem from './cell-list-item'
import { AddCell } from '../'

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map(id => data[id])
  })

  const { fetchCells, saveCells } = useActions()

  useEffect(() => {
    fetchCells()
  }, [])

  const renderedCells = cells.map(cell => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ))

  return (
    <div className='cell-list'>
      <AddCell forceVisible={cells.length === 0} prevCellId={null} />
      {renderedCells}
    </div>
  )
}

export default CellList
