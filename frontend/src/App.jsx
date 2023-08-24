import { createContext, useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Authrization/Login'
import Register from './components/Authrization/Register'
import { Home } from './components/Routes/Home'
import axios from 'axios'
import Create from './components/Routes/Create'
import Footer from './components/Navbar/Footer'
import Posts from './components/Routes/Posts'
import Editpost from './components/Routes/Editpost'

export const userContext = createContext()

function App() {
  axios.defaults.withCredentials = true
  const [user, setUser] = useState({})
  useEffect(() => {
    axios.get("http://localhost:8093/loggin")
      .then(res => {
        setUser(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  })
  return (
    <userContext.Provider value={user}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/create' element={<Create />} />
          <Route exact path='/post/:id/:postedby' element={<Posts />} />
          <Route exact path='/edit-post/:id/:postedby' element={<Editpost />} />
        </Routes>
        <Footer />
      </Router>
    </userContext.Provider>
  )
}

export default App
