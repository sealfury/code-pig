import 'bulmaswatch/solar/bulmaswatch.min.css'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './state'
import { CodeCell, TextEditor } from './components'

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CodeCell />
        <TextEditor />
      </div>
    </Provider>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
