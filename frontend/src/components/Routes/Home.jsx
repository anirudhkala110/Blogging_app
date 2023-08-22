import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const Home = () => {
  const [post, setPost] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8093/get-all-posts')
      .then(posts => {
        setPost(posts.data)
      })
      .catch(err => console.log(err))
  })
  return (
    <div>
      <div className=''>
        <div className=''>
          {
            post.map(post => (
              <div className='card'>
                <div className='card-header'>
                  {post.title}
                </div>
                <div className='card-body'>
                  <img className='img-thumbnail' />
                  <div className='card-text'>
                    {post.description}
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
