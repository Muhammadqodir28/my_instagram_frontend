import React from 'react'
import { useNavigate } from 'react-router-dom'
import './PostDetail.css'

export default function PostDetail({ item, toggleDetails }) {
  const navigate = useNavigate()

  const removePost = async (postId) => {
    try {
      const response = await fetch(`https://my-instagram-backend-pearl.vercel.app/delete-post/${postId}`, {
        method: 'delete',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      })

      const result = await response.json()
      console.log(result)
      toggleDetails()
      navigate('/')
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className='showComment'>
      <div className='container'>
        <div className='post_picture'>
          <img src={item.photo} alt='' />
        </div>
        <div className='details'>
          <div className='card-header' style={{ borderBottom: '1px solid #00000029' }}>
            <div className='card-picture'>
              <img src={item.photo} alt='' />
            </div>
            <h5> {item.postedBy.name} </h5>
            <div className='deletePost' onClick={() => { removePost(item._id) }}>
              <span className='material-symbols-outlined'>delete</span>
            </div>
          </div>
          <div className='comment-section' style={{ borderBottom: '1px solid #00000029' }}>
            {
              item.comments.map((comment) => (
                <p className='comm' key={comment._id}>
                  <span className='commenter' style={{ fontWeight: 'bolder' }}> {comment.postedBy.name}{' '} </span>
                  <span className='commentText'> {comment.comment} </span>
                </p>
              ))
            }
          </div>
        </div>
      </div>
      <div className='close-comment' onClick={() => { toggleDetails() }}>
        <span className='material-symbols-outlined material-symbols-outlined-comment'>close</span>
      </div>
    </div>
  )
}
