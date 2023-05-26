import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../img/logo.png'
import './Register.css'

export default function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!emailRegex.test(email)) {
      console.log('Invalid email')
      return
    }

    try {
      const response = await fetch('https://my-instagram-backend-pearl.vercel.app/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, userName, email, password })
      })

      const data = await response.json()

      if(data.error) {
        console.log(data.error)
      } else {
        navigate('/login')
      }
      console.log(data)
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className='register'>
      <div className='form-container'>
        <div className='form'>
          <img className='registerLogo' src={logo} alt='Instagram Logo' />
          <p className='login_letter'>
            Sign up to see photos and videos <br /> from your friends
          </p>
          <form onSubmit={handleSubmit}>
            <div>
              <input type='text' name='name' id='name' placeholder='Full Name' value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <input type='text' name='username' id='username' placeholder='Username' value={userName} onChange={e => setUserName(e.target.value)} />
            </div>
            <div>
              <input type='email' name='email' id='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <input type='password' name='password' id='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <input type='submit' id='submit-btn' value='Register' />
          </form>
          <p>Already have an account ?</p>
          <Link to='/login'>
            <span style={{ color: 'blue', cursor: 'pointer' }}>Login</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
