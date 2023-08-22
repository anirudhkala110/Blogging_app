import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Typewriter from 'typewriter-effect'
import Aos from 'aos'
export const Home = () => {
  const [post, setPost] = useState([])
  useEffect(() => {
    Aos.init()
    axios.get('http://localhost:8093/get-all-posts')
      .then(posts => {
        console.log(posts.data)
        setPost(posts.data)
      })
      .catch(err => console.log(err))
    const interval = setInterval(() => {
      fetchData(); // Fetch data every minute
    }, 60000); // 60000 milliseconds = 1 minute

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  })
  return (
    <div>
      <div className='bg-black w-100 displaymethod py-5 px-3'>
        <div className='text-light'>This is for the exrenal information</div>
        <div className=' container rounded database' style={{ height: "100vh", boxShadow: " 0px 2px 12px 1px" }}>
          <center className='fs-1 fw-bolder text-light  ' style={{ borderBottom: "1px solid" }}>Writer's Thoughts</center>
          {
            post.map((post, i) => (
              <>
                <div className=' mt-5 text-light btn fw-bold bi-text-left'>Posted By&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp; {post.postedby}</div>
                <div className='row mb-5 mx-2'>
                  <hr className='' style={{ backgroundImage: "-webkit-linear-gradient(black,rgb(235 12 114),rgb(235 12 114),black)", height: "12px" }} />
                  <div className='card col-md-12 col-sm-12 col-xl-12 col-lg-10 p-3' data-aos="fade-right" data-aos-delay={i * 1000} key={i} style={{ background: "linear-gradient(45deg, #04031ef2, #000104)", border: "2px solid rgb(135 12 54)" }}>
                    <div className='card-header alert-warning alert border-bottom-dark border fs-2 fw-bolder'>
                      <Typewriter
                        options={{
                          delay: 200,//This is the Typing Speed
                          autoStart: true,
                          loop: true,
                          strings: [`${post.title}`]
                        }} />
                    </div>
                    <div className='card-body'>
                      <center><img className='img-fluid hovering border border-primary rounded-cirlce p-1 alert alert-primary' data-aos="fade-up" style={{ maxWidth: "", maxHeight: "500px" }} src={`http://localhost:8093/Images/${post.file}`} /></center>
                      <div className='card-text text-light fw-bold'>
                        {post.description}
                      </div>
                    </div>
                  </div>
                  <hr className='' style={{ backgroundImage: "-webkit-linear-gradient(left,black,rgb(235 12 114),rgb(235 12 114),black)", height: "12px" }} />
                </div></>
            ))
          }
        </div>
        <div className='text-light'>This is also for the adds </div>
      </div>
    </div>
  )
}
