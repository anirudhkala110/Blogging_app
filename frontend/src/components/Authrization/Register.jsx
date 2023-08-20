import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <div className='bg-dark vh-100'>
            {/* <center className='bi bi-basket' style={{ fontSize: "50vh" }}></center> */}
            <div className='container bg-dark  d-flex justify-content-center align-items-center vh-100'>
                <form className='form-control' style={{ minWidth: "350px", maxWidth: "550px" }} >
                    <center className='mb-3'><h1>Registration Form</h1></center>
                    <div className='form-group mb-2 fw-bold'>
                        <label>Your Complete Name</label>
                        <input type='text' className='form-control' />
                    </div>
                    <div className='form-group mb-2 fw-bold'>
                        <label>Phone Number</label>
                        <input type='number' className='form-control' />
                    </div>
                    <div className='form-group mb-2 fw-bold'>
                        <label>Email</label>
                        <input type='email' className='form-control' />
                    </div>
                    <div className='form-group mb-2 fw-bold'>
                        <label>Password</label>
                        <input type='password' className='form-control' />
                    </div>
                    <div className='form-group mb-2 fw-bold'>
                        <label>Confirm Password</label>
                        <input type='password' className='form-control' />
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