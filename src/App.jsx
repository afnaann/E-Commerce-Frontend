
import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Registation from './pages/Registation'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import {ToastContainer} from 'react-toastify'

function App() {
  return (
    <div className='App'>
      <ToastContainer></ToastContainer>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element= {<Login />}/>
        <Route path='/registration' element= {<Registation />}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
