import './styles/App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { Start } from './components/start-quiz'
import { Quiz } from './components/quiz'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Start /> }/>
        <Route path='/quiz/:quizId' element={ <Quiz /> }/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
