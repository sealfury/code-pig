import 'bulmaswatch/solar/bulmaswatch.min.css'
import ReactDOM from 'react-dom'
import { CodeCell, TextEditor } from './components'

const App = () => {
  return (
    <div>
      <CodeCell />
      <TextEditor />
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
