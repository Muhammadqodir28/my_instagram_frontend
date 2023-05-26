import React, { useState, useEffect, useRef } from 'react'

export default function UploadProfilePicture({ changeprofile }) {
  const hiddenFileInput = useRef(null)

  const [image, setImage] = useState('')
  const [url, setUrl] = useState('')

  const savePicture = async () => {
    try {
      const data = new FormData()
      data.append('file', image)
      data.append('upload_preset', 'my_instagram')
      data.append('cloud_name', 'images-for-instagram')

      const response = await fetch('https://api.cloudinary.com/v1_1/images-for-instagram/image/upload', {
        method: 'post',
        body: data
      })

      const responseData = await response.json()
      setUrl(responseData.url)
      console.log(url)
    } catch(error) {
      console.log(error)
    }
  }

  const postPicture = async () => {
    try {
      const response = await fetch('https://my-instagram-backend-pearl.vercel.app/upload-profile-picture', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
          picture: url
        })
      })

      const responseData = await response.json()
      console.log(responseData)
      changeprofile()
      window.location.reload()
    } catch(error) {
      console.log(error)
    }
  }

  const handleClick = () => {
    hiddenFileInput.current.click()
  }

  useEffect(() => {
    if (image) {
      savePicture()
    }
  }, [image])

  useEffect(() => {
    if (url) {
      postPicture()
    }
  }, [url])

  return (
    <div className='profilePic darkBg'>
      <div className='changePic centered'>
        <div>
          <h2>Change Profile Photo</h2>
        </div>
        <div style={{ borderTop: '1px solid #00000030' }}>
          <button className='upload-btn' style={{ color: "#1EA1F7" }} onClick={handleClick}>Upload Photo</button>
          <input type='file' ref={hiddenFileInput} accept='image/*' style={{ display: 'none' }} onChange={(event) => { setImage(event.target.files[0]) }} />
        </div>
        <div style={{ borderTop: '1px solid #00000030' }}>
          <button className='upload-btn' style={{ color: '#ED4956' }} onClick={() => {
            setUrl(null)
            postPicture()
          }}>
            {' '}
            Remove Current Photo
          </button>
        </div>
        <div style={{ borderTop: '1px solid #00000030' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px' }} onClick={changeprofile}>cancel</button>
        </div>
      </div>
    </div>
  )
}
