import React, { useContext, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css/'
import axios from 'axios'
import { userContext } from '../../App'
import { Link } from 'react-router-dom'
import AddLeft from '../Adds/AddLeft'
import AddRight from '../Adds/AddRight'
// axios.defaults.withCredentials = true
const Create = () => {

    const user = useContext(userContext)

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [file, setFile] = useState()
    const [msg, setMsg] = useState()
    const [msg_type, setMsg_type] = useState()
    const handleFile = (e) => {
        setFile(e.target.files[0])
    }
    const handleTimeoutClear = () => {
        clearTimeout(refresh1);
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Title : ", title, "\nDescription : ", description, "\nfile : ", file)
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('file', file)
        console.log(formData)
        axios.post('http://localhost:8093/create', formData)
            .then(res => {
                setMsg(res.data.msg)
                setMsg_type(res.data.msg_type)
                if (res.data.msg_type === 'good') {
                    let refresh1 = setTimeout(() => {
                        setMsg(null)
                    }, 2000)
                    handleTimeoutClear()
                }
            })
            .catch(err => console.log(err))
    }
    const handleClose = () => {
        setMsg(null)
    }
    return (
        <div>
            <div className='bg-white w-100 displaymethod py-1 px-1'>
                <div className='text-light bg-dark p-3' style={{ maxWidth: '300px' }} ><AddLeft /></div>
                {user.username ? <div><div className='container w-100 d-flex justify-content-center align-items-center' style={{ height: "90vh" }}>
                    <form onSubmit={e => handleSubmit(e)} className='border shadow p-3'>
                        {msg && <center className={`w-100 fw-bolder alert d-flex justify-content-between align-items-center  ${msg_type === "error" ? 'alert-danger' : 'alert-success'}`}>{msg} <i className='bi bi-x fs-4' style={{ cursor: "pointer" }} onClick={e => handleClose()}></i></center>}
                        <center className='fs-1 fw-bolder'>Create New Blog</center>
                        <div className='input-group'>
                            <label className='form-label fw-bold text-center w-100 border-bottom border-dark p-2 text-uppercase bg-info rounded-top rounded-top-circle '>Title</label>
                            <input type='text' placeholder='T i t l e' className='form-control my-2 w-100' onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className='input-group'>
                            <textarea cols='80' rows='10' onChange={e => setDescription(e.target.value)}></textarea>
                        </div>
                        <div class="custom-file">
                            <input type="file" class="form-control text-black p-3 btn btn-outline-primary my-3 text-light" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" onChange={handleFile} />
                        </div>
                        <button type='submit' className='btn btn-success w-100'>Upload</button>
                    </form>
                </div>
                    {msg_type && <button className='btn fw-bold btn-primary mx-1 '> <a href='/' className='text-decoration-none text-light my-1'> Go Back To Home </a></button>}
                </div> : <div className='container'>
                    <div className='alert alert-danger text-center p-5 fs-1 fw-bolder mt-5 mb-5'>You are not <strong>Authorized</strong> to use this page please <Link to='/login' className='text-decoration-none'>login</Link> first <br /><strong>Error 404 : </strong>Page Not Found
                    </div>
                    <button className='btn fw-bold btn-primary mx-1 '> <a href='/' className='text-decoration-none text-light my-1'> Go Back To Home </a></button>
                </div>}
                <div className='text-light bg-dark p-3' style={{ maxWidth: '300px' }} ><AddRight /></div>
            </div>
        </div >
    )
}

export default Create