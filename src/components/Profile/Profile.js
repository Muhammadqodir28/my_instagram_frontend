import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PostDetail from '../PostDetail/PostDetail'
import UploadProfilePicture from '../UploadProfilePicture/UploadProfilePicture'
import './Profile.css'

export default function Profile() {
  const picture_default = 'https://cdn-icons-png.flaticon.com/128/64/64572.png'

  const [user, setUser] = useState('')
  const [picture, setPicture] = useState([])
  const [posts, setPosts] = useState([])
  const [changePicture, setChangePicture] = useState(false)
  const [show, setShow] = useState(false)

  const toggleDetails = (posts) => {
    setShow((prevShow) => !prevShow)
    setPosts(posts)
  }

  const changeProfile = () => {
    setChangePicture((prevChangePicture) => !prevChangePicture)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://my-instagram-backend-pearl.vercel.app/user/${JSON.parse(localStorage.getItem('user'))._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          }
        })
        const result = response.data
        console.log(result)
        setPicture(result.post)
        setUser(result.user)
        console.log(picture)
      } catch(error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='profile'>
      <div className='profile-frame'>
        <div className='profile-pic'>
          <img onClick={changeProfile} src={user.photo || picture_default} alt='' />
        </div>
        <div className='profile-data'>
          <h1>{JSON.parse(localStorage.getItem('user')).name}</h1>
          <div className='profile-info' style={{ display: 'flex' }}>
            <p>{picture.length || '0'} posts</p>
            <p>{user.followers?.length || '0'} followers</p>
            <p>{user.following?.length || '0'} following</p>
          </div>
        </div>
      </div>
      <hr style={{ width: '90%', margin: '25px auto', opacity: '0.8' }} />
      <div className='gallery'>
        {picture.map((pics) => (
          <img className='item' src={pics.photo} key={pics._id} onClick={() => toggleDetails(pics)} alt='' />
        ))}
      </div>
      {show && <PostDetail item={posts} toggleDetails={toggleDetails} />}
      {changePicture && <UploadProfilePicture changeprofile={changeProfile} />}
    </div>
  )
}
