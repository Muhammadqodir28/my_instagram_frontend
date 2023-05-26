import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import logo from '../../img/logo.png'
import './Header.css'

export default function Header({ login }) {
  const navigate = useNavigate()

  const [keyword, setKeyword] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await fetch('https://my-instagram-backend-pearl.vercel.app/search', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          },
          body: JSON.stringify({ keyword })
        })

        if(response.ok) {
          const data = await response.json()
          setUsers(data)
        } else {
          console.log(response.statusText)
        }
      } catch(error) {
        console.log(error)
      }
    }

    if(keyword !== '') {
      handleSearch()
    }
  }, [keyword])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const renderUserList = () => {
    return users.map((user) => (
      <li key={user._id}>
        {user.name} - {user.userName}
        <hr />
      </li>
    ))
  }

  const renderLoggedInOptions = () => {
    const token = localStorage.getItem('jwt')
    if(login || token) {
      return (
        <>
          <div>
            <input type='text' className='search' placeholder='Search' value={keyword} onChange={(e) => setKeyword(e.target.value)} />
            <span className='material-symbols-outlined search'>search</span>

            <ul className='searching'>
              {renderUserList()}
            </ul>
          </div>
          <Link to='/'>
            <span className='material-symbols-outlined material'>home</span>
          </Link>
          <Link to='/create-post'>
            <span className='material-symbols-outlined material'>add_box</span>
          </Link>
          <Link to='/profile'>
            <span className='material-symbols-outlined material'>account_circle</span>
          </Link>
          <span className='material-symbols-outlined material' onClick={handleLogout}>logout</span>
        </>
      )
    }
  }

  return (
    <div className='header'>
      <img src={logo} alt='Instagram' onClick={() => navigate('/')} />
      <ul className='head-menu'>
        {renderLoggedInOptions()}
      </ul>
      <Link to='/about'>
        <p>About</p>
      </Link>
    </div>
  )
}
