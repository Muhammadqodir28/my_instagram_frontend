import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  const picture_default = 'https://cdn-icons-png.flaticon.com/128/64/64572.png'

  const navigate = useNavigate()

  const [data, setData] = useState([])
  const [comment, setComment] = useState('')
  const [show, setShow] = useState(false)
  const [item, setItem] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwt')
        if(!token) {
          navigate('./register')
        } else {
          const response = await fetch('https://my-instagram-backend-pearl.vercel.app/all-posts', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
          })
          const result = await response.json()
          console.log(result)
          setData(result)
        }
      } catch(error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  const toggleFunctionForComments = (posts) => {
    setShow(!show)
    setItem(posts)
  }

  const likeFunction = async (id) => {
    try {
      const response = await fetch('https://my-instagram-backend-pearl.vercel.app/like', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
          postId: id
        })
      })
      const result = await response.json()
      const newData = data.map((posts) => {
        return posts._id === result._id ? result : posts
      })
      setData(newData)
      console.log(result)
    } catch(error) {
      console.log(error)
    }
  }

  const unlikeFunction = async (id) => {
    try {
      const response = await fetch('https://my-instagram-backend-pearl.vercel.app/unlike', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
          postId: id
        })
      })
      const result = await response.json()
      const newData = data.map((posts) => {
        return posts._id === result._id ? result : posts
      })
      setData(newData)
      console.log(result)
    } catch(error) {
      console.log(error)
    }
  }

  const savingPost = async (id) => {
    try {
      const response = await fetch('https://my-instagram-backend-pearl.vercel.app/save', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
          postId: id
        })
      })
      const result = await response.json()
      const newData = data.map((posts) => {
        return posts._id === result._id ? result : posts
      })
      setData(newData)
      console.log(result)
    } catch(error) {
      console.log(error)
    }
  }

  const unsavingPost = async (id) => {
    try {
      const response = await fetch('https://my-instagram-backend-pearl.vercel.app/unsave', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
          postId: id
        })
      })
      const result = await response.json()
      const newData = data.map((posts) => {
        return posts._id === result._id ? result : posts
      })
      setData(newData)
      console.log(result)
    } catch(error) {
      console.log(error)
    }
  }

  const addCommentFunction = async (text, id) => {
    try {
      const response = await fetch('https://my-instagram-backend-pearl.vercel.app/comment', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
          text: text,
          postId: id
        })
      })
      const result = await response.json()
      const newData = data.map((posts) => {
        return posts._id === result._id ? result : posts
      })
      setData(newData)
      setComment('')
      console.log(result)
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className='home'>
      {
        data.map((posts) => (
          <div className='card' key={posts._id}>
            <div className='card-header'>
              <div className='card-picture'>
                <img src={posts.postedBy.photo ? posts.postedBy.photo : picture_default} alt='' />
              </div>
              <h5>
                <Link to={`/profile/${posts.postedBy._id}`}>{posts.postedBy.name}</Link>
              </h5>
            </div>
            <div className='card-image'>
              <img src={posts.photo} alt='' />
            </div>
            <div className='card-content'>
              {
                posts.likes.includes(JSON.parse(localStorage.getItem('user'))._id) ? (
                <span className='material-symbols-outlined material-symbols-outlined-red' onClick={() => unlikeFunction(posts._id)}>
                  favorite
                </span>
                ) : (
                  <span className='material-symbols-outlined' onClick={() => likeFunction(posts._id)}>
                    favorite
                  </span>
                )
              }
              <span className='material-symbols-outlined' onClick={() => toggleFunctionForComments(posts)}>
                maps_ugc
              </span>
              {
                posts.saves.includes(JSON.parse(localStorage.getItem('user'))._id) ? (
                <span className='material-symbols-outlined material-symbols-outlined-black save' onClick={() => unsavingPost(posts._id)}>
                  bookmark
                </span>
                ) : (
                  <span className='material-symbols-outlined save' onClick={() => savingPost(posts._id)}>
                    bookmark
                  </span>
                )
              }
              <p>{posts.likes.length} likes</p>
              <p>{posts.body}</p>
            </div>
            <div className='add-comment'>
              <span className='material-symbols-outlined'>sentiment_satisfied</span>
              <input type='text' placeholder='Add a comment' value={comment} onChange={(e) => setComment(e.target.value)} />
              <button className='comment' onClick={() => addCommentFunction(comment, posts._id)}>
                Post
              </button>
            </div>
          </div>
        ))
      }
      {
        show && (
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
                  <h5>{item.postedBy.name}</h5>
                </div>
                <div className='comment-section' style={{ borderBottom: '1px solid #00000029' }}>
                  {
                    item.comments.map((comment) => (
                      <p className='comment_id' key={comment._id}>
                        <span className='commenter' style={{ fontWeight: 'bolder' }}>
                          {comment.postedBy.name}{' '}
                        </span>
                        <span className='commentText'>{comment.comment}</span>
                      </p>
                    ))
                  }
                </div>
                <div className='add-comment'>
                  <span className='material-symbols-outlined'>sentiment_satisfied</span>
                  <input type='text' placeholder='Add a comment' value={comment} onChange={(e) => setComment(e.target.value)} />
                  <button className='comment' onClick={() => {
                    addCommentFunction(comment, item._id)
                    toggleFunctionForComments()
                  }}>
                    Post
                  </button>
                </div>
              </div>
            </div>
            <div className='close-comment' onClick={() => toggleFunctionForComments()}>
              <span className='material-symbols-outlined material-symbols-outlined-comment'>close</span>
            </div>
          </div>
        )
      }
    </div>
  )
}
