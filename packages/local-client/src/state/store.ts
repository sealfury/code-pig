import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistCellData } from './middlewares'
import reducers from './reducers'

export const store = createStore(
  reducers,
  {},
  applyMiddleware(persistCellData, thunk)
)
