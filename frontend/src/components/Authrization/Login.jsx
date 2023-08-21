import React, { useEffect, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
    })
    const [hide1, setHide1] = useState(true)
    const [msg, setMsg] = useState('')
    const [msg_type, setMsg_type] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8093/login', { ...values, email: values.email, password: values.password })
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

    return (
        <>
            {/* <center class="bi bi-moon-stars-fill fw-bolder" style={{ fontSize: "50vh" }}></center> */}
            <div className='container d-flex justify-content-center align-items-center ' style={{ height: "100vh" }}>
                <form className='form1 form-control alert alert-dark text-black px-4 py-3 shadow border border-primary border-1 fw-bolder' style={{ maxWidth: "500px", minWidth: "350px" }} onSubmit={handleSubmit}>
                    <center className='fw-bolder mb-4'><h1>Login Form</h1></center>
                    {msg && <center className={`w-100 fw-bolder ${msg_type === "error" ? 'alert alert-danger d-flex justify-content-between' : 'alert d-flex justify-content-between alert-warning'}`}>{msg} <i className='bi bi-x fs-4' style={{ cursor: "pointer" }} onClick={e => handleClose()}></i></center>}
                    <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example1">Email address</label>
                        <input type="email" id="form2Example1" class="form-control" onChange={e => setValues({ ...values, email: e.target.value })} required/>
                    </div>

                    <div class="form-outline mb-4">
                        <div className='form-group mb-2 fw-bold'>
                            <label>Password</label>
                            <div className='d-flex justify-content-between align-items-center'>
                                <input type={hide1 ? 'password' : 'text'} className='w-100 form-control' onChange={e => setValues({ ...values, password: e.target.value })} required />
                                {hide1 ? <i className='bi bi-eye-fill' style={{ marginLeft: "-20px", cursor: "pointer" }} onClick={e => hideshow1(e)}></i>
                                    : <i className='bi bi-eye-slash-fill' style={{ marginLeft: "-20px", cursor: "pointer" }} onClick={e => hideshow1(e)}></i>}
                            </div>
                        </div>
                    </div>

                    <div class="row mb-4">
                        <div class="col d-flex justify-content-center">

                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                                <label class="form-check-label" for="form2Example31"> Remember me </label>
                            </div>
                        </div>

                        <div class="col">
                            <a href="#!">Forgot password?</a>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary btn-block mb-4 w-100">Sign in</button>

                    <div class="text-center">
                        <p>Not a member? <Link to="/register" className='text-decoration-none'>Register</Link></p>
                        <p>or sign up with:</p>
                        <button type="button" class="btn btn-link btn-floating mx-1">
                            <i class="bi bi-facebook"></i>
                        </button>

                        <button type="button" class="btn btn-link btn-floating mx-1">
                            <i class="bi bi-google"></i>
                        </button>

                        <button type="button" class="btn btn-link btn-floating mx-1">
                            <i class="bi bi-twitter"></i>
                        </button>

                        <button type="button" class="btn btn-link btn-floating mx-1">
                            <i class="bi bi-github"></i>
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login