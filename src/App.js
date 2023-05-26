import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Context } from './context/Context'
import About from './components/About/About'
import CreatePost from './components/CreatePost/CreatePost'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Profile from './components/Profile/Profile'
import Register from './components/Register/Register'
import UserProfile from './components/UserProfile/UserProfile'
import './App.css'

function App() {
  const [userLogin, setUserLogin] = useState(false)

  return (
    <BrowserRouter>
      <div className='App'>
        <Context.Provider value={{ setUserLogin }}>
          <Header login={userLogin} />
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route exact path='/profile' element={<Profile/>}></Route>
            <Route path='/create-post' element={<CreatePost/>}></Route>
            <Route path='/profile/:userid' element={<UserProfile/>}></Route>
            <Route path='/about' element={<About/>}></Route>
          </Routes>
        </Context.Provider>
      </div>
    </BrowserRouter>
  )
}

export default App
