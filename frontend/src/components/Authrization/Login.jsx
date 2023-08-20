import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link } from 'react-router-dom'
const Login = () => {
    return (
        <div className='bg-dark'>
            {/* <center class="bi bi-moon-stars-fill fw-bolder" style={{ fontSize: "50vh" }}></center> */}
            <div className='container d-flex justify-content-center align-items-center ' style={{ height: "93vh" }}>
                <form className='form-control p-2 shadow border border-primary border-1' style={{ maxWidth: "550px", minWidth: "350px" }}>
                    <center className='fw-bolder mb-4'><h1>Login Form</h1></center>
                    <div class="form-outline mb-4">
                        <input type="email" id="form2Example1" class="form-control" />
                        <label class="form-label" for="form2Example1">Email address</label>
                    </div>

                    <div class="form-outline mb-4">
                        <input type="password" id="form2Example2" class="form-control" />
                        <label class="form-label" for="form2Example2">Password</label>
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

                    <button type="button" class="btn btn-primary btn-block mb-4 w-100">Sign in</button>

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
        </div>
    )
}

export default Login