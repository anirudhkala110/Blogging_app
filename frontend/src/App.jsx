import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Authrization/Login'
import Register from './components/Authrization/Register'
import { Home } from './components/Routes/Home'
function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/Home' element={<Home />} />
        <Route exact path='/register' element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
