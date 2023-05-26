import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './CreatePost.css'

export default function CreatePost() {
  const picture_default = 'https://cdn-icons-png.flaticon.com/128/64/64572.png'

  const [body, setBody] = useState('')
  const [image, setImage] = useState('')
  const [user, setUser] = useState('')
  const [url, setUrl] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const postToServer = async () => {
      try {
        const response = await fetch('https://my-instagram-backend-pearl.vercel.app/create-post', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          },
          body: JSON.stringify({
            body,
            picture: url
          })
        })
        const data = await response.json()
        if(data.error) {
          console.log(data.error)
        } else {
          navigate('/')
        }
      } catch(error) {
        console.log(error)
      }
    }

    if(url) {
      postToServer()
    }
  }, [url])

  const savePost = async () => {
    console.log(body, image)
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'my_instagram')
    data.append('cloud_name', 'images-for-instagram')

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/images-for-instagram/image/upload', {
        method: 'post',
        body: data
      })
      const dataJson = await response.json()
      setUrl(dataJson.url)
    } catch(error) {
      console.log(error)
    }
    console.log(url)
  }

  const file = (event) => {
    const fileReader = new FileReader()
    const output = document.getElementById('output')

    fileReader.onload = function() {
      output.src = fileReader.result
    }

    fileReader.readAsDataURL(event.target.files[0])
  }

  return (
    <div className='createPost'>
      <div className='post-header'>
        <h4 style={{ margin: '3px auto' }}>Create New Post</h4>
        <button id='post-btn' onClick={savePost}>Share</button>
      </div>
      <div className='main-div'>
        <img src='https://cdn-icons-png.flaticon.com/128/3342/3342137.png' id='output' />
        <input type='file' accept='image/*' onChange={(event) => {
          file(event)
          setImage(event.target.files[0])
        }} />
      </div>
      <div className='details'>
        <div className='card-header'>
          <div className='card-picture'>
            <img src={user.photo ? user.photo : picture_default} alt='' />
          </div>
          <h5>{JSON.parse(localStorage.getItem('user')).name}</h5>
        </div>
        <textarea type='text' placeholder='Description' value={body} onChange={(e) => { setBody(e.target.value) }}></textarea>
      </div>
    </div>
  )
}
