import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Register = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        cpassword: '',
        phone: ''
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values)
        axios.post('http://localhost:8093/register')
    }
    return (
        <div className=' vh-100'>
            {/* <center className='bi bi-basket' style={{ fontSize: "50vh" }}></center> */}
            <div className='container  d-flex justify-content-center align-items-center vh-100'>
                <form className='form2 form-control alert alert-success shadow p-5' onSubmit={e => handleSubmit(e)} style={{ minWidth: "350px", maxWidth: "550px" }} >
                    <center className='mb-3'><h1>Registration Form</h1></center>
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
                        <input type='password' className='form-control' onChange={e => setValues({ ...values, password: e.target.value })} required />
                    </div>
                    <div className='form-group mb-2 fw-bold'>
                        <label>Confirm Password</label>
                        <input type='password' className='form-control' onChange={e => setValues({ ...values, cpassword: e.target.value })} required />
                    </div>
                    <button type='submit' className='btn btn-success w-100 my-2'>Register</button>
                    <center className='fw-bolder'>Already have an Account?</center>
                    <Link to='/' type='submit' className='btn btn-primary w-100 text-decoration-none'>Login</Link>
                </form>

            </div>
        </div>
    )
}

export default Register