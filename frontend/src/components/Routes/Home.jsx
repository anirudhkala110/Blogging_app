import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import Typewriter from 'typewriter-effect';
import Aos from 'aos';
import { Link } from 'react-router-dom';
import AddLeft from '../Adds/AddLeft';
import AddRight from '../Adds/AddRight';

export const Home = () => {
  const bottomRef = useRef(null);

  const [post, setPost] = useState([]);

  useEffect(() => {
    Aos.init();
    axios
      .get('http://localhost:8093/get-all-posts')
      .then((posts) => {
        setPost(posts.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className='bg-white w-100 displaymethod py-1 px-1'>
        <div className='text-light bg-dark p-3' style={{ maxWidth: '300px' }}>
          <AddLeft />
        </div>
        <div className='mx-2 shadow-lg'>
          <center
            className='fs-1 fw-bolder text-black  '
            style={{ borderBottom: '1px solid', letterSpacing: '10px' }}
          >
            Writer's Thoughts
          </center>
          <div
            className=' container rounded database pb-2'
            style={{ height: '100vh', boxShadow: ' ' }}
          >
            <a
              href='#bottom'
              className='btn btn-primary fs-4 fw-bold my-1'
              onClick={() => scrollToRef(bottomRef)}
            >
              <i id='top' className='bi bi-arrow-down-circle-fill'></i>
            </a>
            {post.map((post, i) => (
              <Link
                to={`/post/${post.id}/${post.postedby}`}
                className='text-decoration-none'
                data-aos='fade-right'
                data-aos-delay={i * 1000}
                key={i}
              >
                <div
                  className='row shadow my-5 mx-2'
                  ref={i === post.length - 1 ? bottomRef : null}
                >
                  <div className='card col-md-12 col-sm-12 col-xl-12 col-lg-10 pb-3 '>
                    <div className='bg-light rounded shadow my-1 px-3 py-3'>
                      <Typewriter
                        onInit={(typewriter) => {
                          typewriter
                            .pauseFor(1000)
                            .typeString(post.title)
                            .start();
                        }}
                        options={{
                          delay: 50,
                          autoStart: true,
                          loop: true,
                        }}
                        className=''
                      />
                    </div>
                    <div className='card-body d-flex justify-content-start'>
                      <div className='me-5'>
                        <img
                          className='img-fluid hovering border border-primary rounded-2 rounded p-1 alert alert-primary'
                          data-aos='fade-up'
                          style={{ maxWidth: '200px', maxHeight: '200px' }}
                          src={`http://localhost:8093/Images/${post.file}`}
                        />
                      </div>
                      <div className='card-text fw-bold description-container'>
                        {post.description}
                      </div>
                    </div>
                    <div className='border shadow text-dark mx-2 my-1 btn fw-bold bi-text-left'>
                      Posted By&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{' '}
                      {post.postedby},<br /> Created At : {post.createdAt},<br /> Last Updated At :{' '}
                      {post.updatedAt}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            <a
              href='#top'
              className='btn btn-primary fs-4 fw-bold my-1'
              onClick={() => scrollToRef(bottomRef)}
            >
              <i id='bottom' className='bi bi-arrow-up-circle-fill'></i>
            </a>
          </div>
        </div>
        <div className='text-light bg-dark p-3' style={{ maxWidth: '300px' }}>
          <AddRight />
        </div>
      </div>
    </div>
  );
};
