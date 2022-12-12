import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import useAuthContext from './Hooks/useAuthContext'
import Auth from './Pages/Auth/Auth'
import Home from './Pages/Home/Home'

function App() {

  const {user,dispach} = useAuthContext();

  useEffect(()=>{
    let storedUser = JSON.parse(localStorage.getItem("user"));
    if(storedUser)
    {
      dispach({type:"LOGIN", payload:storedUser});
    }
  },[])

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
