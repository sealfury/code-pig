import { Dispatch } from 'redux'
import { Action } from '../actions'
import { ActionType } from '../action-types'
import { saveCells } from '../action-creators'

export const persistCellData = ({
  dispatch,
}: {
  dispatch: Dispatch<Action>
}) => {
  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action)

      if (
        [
          ActionType.MOVE_CELL,
          ActionType.INSERT_CELL_AFTER,
          ActionType.UPDATE_CELL,
          ActionType.DELETE_CELL,
        ].includes(action.type)
      ) {
        console.log('trying to save cells...')
      }
    }
  }
}
