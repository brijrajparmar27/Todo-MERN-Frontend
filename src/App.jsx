import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './Pages/Auth/Auth'
import Home from './Pages/Home/Home'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </div>
  )
}

export default App
