import { ActionType } from '../action-types'
import { InsertCellAfterAction } from '../actions'
import { CellType } from '../cell'

export const insertCellAfter = (
  id: string | null,
  cellType: CellType
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  }
}
