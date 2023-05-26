import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../../context/Context'
import logo from '../../img/logo.png'
import './Login.css'

export default function Login() {
  const { setUserLogin } = useContext(Context)
  const navigate = useNavigate()

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
      const response = await fetch('https://my-instagram-backend-pearl.vercel.app/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if(data.error) {
        console.log(data.error)
      } else {
        console.log(data)
        localStorage.setItem('jwt', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setUserLogin(true)
        navigate('/')
      }
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className='login'>
      <div className='form-container'>
        <div className='login_form'>
          <img className='registerLogo' src={logo} alt='Instagram Logo' />
          <p className='login_letter'>
            Welcome back to your account <br />
          </p>
          <form onSubmit={handleSubmit}>
            <div>
              <input type='email' name='email' id='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <input type='password' name='password' id='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <input type='submit' id='login-btn' value='Login' />
          </form>
          <p>Don't have an account ?</p>
          <Link to='/register'>
            <span style={{ color: 'blue', cursor: 'pointer' }}>Register</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
