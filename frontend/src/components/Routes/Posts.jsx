import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { userContext } from '../../App'
import AddLeft from '../Adds/AddLeft'
import AddRight from '../Adds/AddRight'
const Posts = () => {
    const { id, postedby } = useParams()
    const [post, setPost] = useState({})
    const user = useContext(userContext)
    const [msg, setMsg] = useState()
    const [msg_type, setMsg_type] = useState(null)
    // console.log(user)
    useEffect(() => {
        axios.get(`http://localhost:8093/read-post/` + id + '/' + postedby)
            .then(res => setPost(res.data))
            .catch(err => console.log(err))
    }, [])
    const [displaydata, setDisplaydata] = useState(null)
    const navigate = useNavigate()
    const handleDelete = (id) => {
        console.log("Deleting data")
        axios.delete(`http://localhost:8093/delete-post/` + id)
            .then(res => {
                setMsg(res.data.msg)
                if (res.data.msg_type === "delete") {
                    setMsg_type(res.data.msg_type)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className='bg-dark'>
            <div className='bg-black w-100 displaymethod px-1'>
                <div className='text-light bg-dark p-3' style={{ maxWidth: '300px' }} ><AddLeft /></div>
                <div>
                    {!msg_type && <div>
                        <div className='pt-2 displaymethod container bg-white justify-content-start px-2 align-items-start' style={{ minHeight: "75vh" }}>
                            <img className='img-thumbnail shadow rounded-1 rounded bg-dark me-3 ' src={`http://localhost:8093/Images/${post.file}`} style={{ maxWidth: '900px', maxHeight: '700px', minWidth: "250px", minHeight: "250px" }} />
                            <div className='card px-1 overflow-y-auto border-0 w-100 bg-white shadow-lg' style={{ maxHeight: "750px", minHeight: "550px", scrollbarWidth: "0" }}>
                                <h1 className='card-header bg-primary text-light' style={{ letterSpacing: "5px" }}>{post.title}</h1>
                                {/* <hr /> */}
                                <button className='alert shadow-lg alert-warning mt-1 fw-bold' style={{ zIndex: "1" }}>Written by - (Posted By) - (Author) : <strong>{postedby}</strong></button>
                                {user.username === `${postedby}` ? <>
                                    <p className='card-body border bg-light text-black fw-bold shadow-lg rounded-2 mt-2 w-100 mb-1' style={{ zIndex: "10" }}>{post.description}</p>
                                    <div className='container mt-1 bg-white my-2 d-flex justify-content-start align-items-center' style={{ zIndex: "20" }}>
                                        <Link to={`/edit-post/${id}`} className='btn btn-outline-success fw-bold fs-6 my-1 mx-5 rounded-0 btnhover'>Edit</Link>
                                        <button className='btn btn-outline-danger fw-bold fs-6 my-1 mx-5 rounded-0 btnhover' onClick={e => handleDelete(post.id)}>Delete</button>
                                    </div></>
                                    :
                                    <p className='card-body border bg-light text-black fw-bold rounded-2 mt-2'>{post.description}</p>
                                }
                            </div>
                        </div>
                        {<button className='btn fw-bold btn-primary m-1 '> <a href='/' className='text-decoration-none text-light'> Go Back </a></button>}
                    </div>}
                    { msg_type &&<div className='alert alert-danger my-5 align-items-center d-flex'>
                        {msg}
                        {<button className='fw-bold btn-success mx-1 btn btn-success my-1'> <a href='/' className='text-decoration-none text-light'> Go Back </a></button>}
                    </div>}
                </div>
                <div className='text-light bg-dark p-3' style={{ maxWidth: '300px' }} ><AddRight /></div>
            </div>

        </div>
    )
}

export default Posts