import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../Profile/Profile.css'

export default function UserProfile() {
  const picture_default = 'https://cdn-icons-png.flaticon.com/128/64/64572.png'

  const { userid } = useParams()

  const [isFollow, setIsFollow] = useState(false)
  const [user, setUser] = useState('')
  const [posts, setPosts] = useState([])

  const followUser = async (userId) => {
    try {
      await axios.put(
        'https://my-instagram-backend-pearl.vercel.app/follow',
        { followId: userId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        }
      )
      setIsFollow(true)
    } catch(error) {
      console.log(error)
    }
  }

  const unfollowUser = async (userId) => {
    try {
      await axios.put(
        'https://my-instagram-backend-pearl.vercel.app/unfollow',
        { followId: userId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          }
        }
      )
      setIsFollow(false)
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://my-instagram-backend-pearl.vercel.app/user/${userid}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          }
        })
        const result = response.data
        console.log(result)
        setUser(result.user)
        setPosts(result.post)
        if(result.user.followers.includes(JSON.parse(localStorage.getItem('user'))._id)) {
          setIsFollow(true)
        }
      } catch(error) {
        console.log(error)
      }
    }

    fetchData()
  }, [isFollow])

  return (
    <div className='profile'>
      <div className='profile-frame'>
        <div className='profile-pic'>
          <img src={user.photo || picture_default} alt='' />
        </div>
        <div className='pofile-data'>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h1>{user.name}</h1>
            <button
              className='followBtn'
              onClick={() => {
                if(isFollow) {
                  unfollowUser(user._id)
                } else {
                  followUser(user._id)
                }
              }}
            >
              {isFollow ? 'Unfollow' : 'Follow'}
            </button>
          </div>
          <div className='profile-info' style={{ display: 'flex' }}>
            <p>{posts.length} posts</p>
            <p>{user.followers?.length || '0'} followers</p>
            <p>{user.following?.length || '0'} following</p>
          </div>
        </div>
      </div>
      <hr
        style={{
          width: '90%',
          opacity: '0.8',
          margin: '25px auto',
        }}
      />
      <div className='gallery'>
        {posts.map((pics) => (
          <img key={pics._id} src={pics.photo} alt='' className='item' />
        ))}
      </div>
    </div>
  )
}
