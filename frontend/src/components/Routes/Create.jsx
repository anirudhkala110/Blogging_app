import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css/'
import axios from 'axios'
import { userContext } from '../../App'
const Create = () => {
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [file, setFile] = useState()
    const [msg, setMsg] = useState()
    const [msg_type, setMsg_type] = useState()
    const handleFile = (e) => {
        setFile(e.target.files[0])
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Title : ", title, "\nDescription : ", description, "\nfile : ", file)
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('image', file)
        console.log(formData)
        axios.post('http://localhost:8093/create', formData)
            .then(res => {
                setMsg(res.data.msg)
                setMsg_type(res.data.msg_type)
                if (res.data.msg_type === 'good') {

                }
            })
            .catch(err => console.log(err))
    }
    const handleClose = () => {
        setMsg(null)
    }
    return (
        <div>
            <div className='container w-100 d-flex justify-content-center align-items-center' style={{ height: "90vh" }}>
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
        </div >
    )
}

export default Create