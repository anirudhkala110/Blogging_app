import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Register = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        cpassword: '',
        phone: '',
    })
    const [hide1, setHide1] = useState(true)
    const [hide2, setHide2] = useState(true)
    const [msg, setMsg] = useState('')
    const [msg_type, setMsg_type] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8093/register', { ...values, email: values.email, password: values.password, cpassword: values.cpassword, phone: values.phone, username: values.username })
            // axios.get('http://localhost:8093/')
            .then(res => {
                console.log(res)
                setMsg(res.data.msg)
                setMsg_type(res.data.msg_type)
                // setInterval(() => {
                //     setMsg(null)
                // }, 5000)
            })
            .catch(err => console.log(err))
    }
    const handleClose = () => {
        setMsg(null)
    }
    const hideshow1 = () => {
        if (hide1) setHide1(false)
        if (!hide1) setHide1(true)
    }
    const hideshow2 = () => {
        if (hide2) setHide2(false)
        if (!hide2) setHide2(true)
    }
    return (
        <div className=' vh-100'>
            {/* <center className='bi bi-basket' style={{ fontSize: "50vh" }}></center> */}
            <div className='container  d-flex justify-content-center align-items-center vh-100'>
                <form className='form2 form-control alert alert-success shadow p-5' onSubmit={handleSubmit} style={{ minWidth: "350px", maxWidth: "550px" }} >
                    <center className='mb-3'><h1>Registration Form</h1></center>
                    {msg && <center className={`w-100 fw-bolder d-flex justify-content-between align-items-center ${msg_type === "error" ? 'alert alert-danger ' : 'alert alert-warning  '}`}>{msg} <i className='bi bi-x fs-4' style={{ cursor: "pointer" }} onClick={e => handleClose()}></i></center>}
                    <div className='form-group mb-2 fw-bold'>
                        <label>Your Complete Name</label>
                        <input type='text' className='form-control' onChange={e => setValues({ ...values, username: e.target.value })} required />
                    </div>
                    <div className='form-group mb-2 fw-bold'>
                        <label>Phone Number</label>
                        <input type='number' className='form-control' onChange={e => setValues({ ...values, phone: e.target.value })} required />
                    </div>
                    <div className='form-group mb-2 fw-bold'>
                        <label>Email</label>
                        <input type='email' className='form-control' onChange={e => setValues({ ...values, email: e.target.value })} required />
                    </div>
                    <div className='form-group mb-2 fw-bold'>
                        <label>Password</label>
                        <div className='d-flex justify-content-between align-items-center'>
                            <input type={hide1 ? 'password' : 'text'} className='w-100 form-control' onChange={e => setValues({ ...values, password: e.target.value })} required />
                            {hide1 ? <i className='bi bi-eye-fill' style={{ marginLeft: "-20px", cursor: "pointer" }} onClick={e => hideshow1(e)}></i>
                                : <i className='bi bi-eye-slash-fill' style={{ marginLeft: "-20px", cursor: "pointer" }} onClick={e => hideshow1(e)}></i>}
                        </div>
                    </div>
                    <div className='form-group mb-2 fw-bold'>
                        <label>Confirm Password</label>
                        <div className='d-flex justify-content-between align-items-center'>
                            <input type={hide2 ? 'password' : 'text'} className='w-100 form-control' onChange={e => setValues({ ...values, cpassword: e.target.value })} required />
                            {hide2 ? <i className='bi bi-eye-fill' style={{ marginLeft: "-20px", cursor: "pointer" }} onClick={e => hideshow2(e)}></i>
                                : <i className='bi bi-eye-slash-fill' style={{ marginLeft: "-20px", cursor: "pointer" }} onClick={e => hideshow2(e)}></i>}
                        </div>
                    </div>
                    <button type='submit' className='btn btn-success w-100 my-2'>Register</button>
                    <center className='fw-bolder'>Already have an Account?</center>
                    <Link to='/login' type='submit' className='btn btn-primary w-100 text-decoration-none'>Login</Link>
                </form>

            </div>
        </div>
    )
}

export default Register