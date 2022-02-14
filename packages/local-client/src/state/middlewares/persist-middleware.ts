import { Dispatch } from 'redux'
import { Action } from '../actions'
import { ActionType } from '../action-types'
import { saveCells } from '../action-creators'
import { RootState } from '../reducers'

export const persistCellData = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>
  getState: () => RootState
}) => {
  let timer: any

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
        if (timer) {
          clearTimeout(timer)
        }
        // save cell content after 0.3s pause
        timer = setTimeout(() => {
          saveCells()(dispatch, getState)
        }, 300)
      }
    }
  }
}
