import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../App'
import { useNavigate, useParams } from 'react-router-dom'
import AddRight from '../Adds/AddRight'
import AddLeft from '../Adds/AddLeft'
import { refresh } from 'aos'
axios.defaults.withCredentials = true
const Editpost = () => {
    const { id, postedby } = useParams()
    const user = useContext(userContext)
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [file, setFile] = useState()
    const [msg, setMsg] = useState()
    const [msg_type, setMsg_type] = useState()
    const handleFile = (e) => {
        setFile(e.target.files[0])
    }
    const editor = postedby
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Title : ", title, "\nDescription : ", description, "\nfile : ", file)
        // const formData = new FormData()
        // formData.append('title', title)
        // formData.append('description', description)
        // formData.append('file', file)
        // console.log(formData)
        const handleTimeoutClear = () => {
            clearTimeout(refresh1);
        };
        axios.put('http://localhost:8093/edit-post/' + id, { title, description })
            .then(res => {
                setMsg(res.data.msg)
                setMsg_type(res.data.msg_type)
                if (res.data.msg_type === 'good') {
                    console.log(user.username)
                    // alert("Going Back To Posts page ")
                    let refresh1 = setTimeout(() => {
                        // window.location.reload(true)
                        setMsg(null)
                    }, 2000)
                    handleTimeoutClear();
                    // navigate(`/posts/${id}/${user.username}`)
                }
                clearTimeout(refresh1)
            })
            .catch(err => console.log(err))
    }
    const handleClose = () => {
        setMsg(null)
    }

    // console.log(user)
    useEffect(() => {
        axios.get(`http://localhost:8093/read-post/` + id + '/' + postedby)
            .then(res => {
                setTitle(res.data.title)
                setDescription(res.data.description)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <div>
            <div className='bg-white w-100 displaymethod py-1 px-1'>
                <div className='text-light bg-dark p-3' style={{ maxWidth: '300px' }} ><AddLeft /></div>
                {
                    user.username===`${postedby}` ? <div>
                        <form onSubmit={e => handleSubmit(e)} className='border shadow p-3'>
                            {msg && <center className={`w-100 fw-bolder alert d-flex justify-content-between align-items-center  ${msg_type === "error" ? 'alert-danger' : 'alert-success'}`}>{msg} <i className='bi bi-x fs-4' style={{ cursor: "pointer" }} onClick={e => handleClose()}></i></center>}
                            <center className='fs-1 fw-bolder'>Create New Blog</center>
                            <div className='input-group'>
                                <label className='form-label fw-bold text-center w-100 border-bottom border-dark p-2 text-uppercase bg-info rounded-top rounded-top-circle '>Title</label>
                                <input type='text' placeholder='T i t l e' className='form-control my-2 w-100' onChange={e => setTitle(e.target.value)} value={title} required />
                            </div>
                            <div className='input-group my-2'>
                                <textarea cols='180' rows='10' onChange={e => setDescription(e.target.value)} value={description} required></textarea>
                            </div>
                            {/* <div class="custom-file">
                            <input type="file" class="form-control text-black p-3 btn btn-outline-primary my-3 text-light" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" onChange={handleFile} />
                        </div> */}
                            <button type='submit' className='btn btn-success w-100' >Update</button>
                        </form>
                        <button className='btn fw-bold btn-primary mx-1 my-1 '> <a href='/' className='text-decoration-none text-light'> Go Back </a></button>
                    </div> : <div className='alert alert-danger d-flex align-items-center'>Not Authorised to access this page
                        <button className='btn fw-bold btn-primary mx-1 my-1 '> <a href='/' className='text-decoration-none text-light'> Go Back </a></button>
                    </div>
                }
                <div className='text-light bg-dark p-3' style={{ maxWidth: '300px' }} ><AddRight /></div>
            </div>
        </div>
    )
}

export default Editpost