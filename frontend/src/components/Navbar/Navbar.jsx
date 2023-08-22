import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/js/dist/collapse'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/offcanvas'
import './Navbar.css'
import { userContext } from '../../App'
import axios from 'axios'

const Navbar = () => {

    const user = useContext(userContext)

    const [account, setAcount] = useState(false)
    const handleDisplay = () => {
        if (account) {
            setAcount(false)
        } else {
            setAcount(true)
        }
    }
    const navigate = useNavigate()
    const handleLogout = () => {
        axios.get('http://localhost:8093/logout')
            .then(res => {
                console.log()
                if (res.data.msg_type === "good") {
                    // navigate('/login')
                    window.location.href = '/'
                }

            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <nav class="navbar navbar-expand-lg px-4 bg-light navbar-light d-flex justify-content-between align-items-center" style={{ boxShadow: "black 0px -12px 30px 2px" }}>
                <div className=''>
                    <a class="navbar-brand fs-3 fw-bolder" href="#Home">Blog App</a>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={e => handleDisplay(e)}>
                    <span class="navbar-toggler-icon"></span>
                </button>
                {user.username && <div className='hideandshow '>
                    <Link to="/" className="btn bt-outline-info fw-bold  me-5 Home" >Home</Link>
                    <Link to="/create" className="btn bt-outline-success fw-bold  mx-2 Create" >Create</Link>
                    <Link to="" className="btn bt-outline-warning fw-bold  ms-5 Contact" >Contact</Link>
                </div>}
                <div className='hideandshow'>
                    {
                        user.username ? <button className="btn btn-danger fw-bold px-5" onClick={handleLogout} >Logout</button> : <Link to="/login" className="btn btn-success fw-bold p-2" > Login / Register </Link>
                    }
                </div>

            </nav>
            <div class={`offcanvas offcanvas-end vh-100 ${account ? 'show' : 'd-block overflow-auto'}`} data-bs-scroll="true" tabindex="-1" id="navbarSupportedContent" aria-labelledby="AccountLabel" style={{ borderLeft: "3px solid blue" }}>
                <div className='offcanvas-header w-100 d-flex justify-content-center mb-4' style={{ boxShadow: "#ffffff6e 10px 1px 12px 1px", zIndex: "10" }}>
                    <div>
                        <i className='bi bi-book' style={{ fontSize: "8vw" }}></i>
                        <hr />
                        <center className='fs-3 fw-bolder'>Read and Write Blog</center>
                    </div>

                </div>
                <div className=' '>
                    {user.username ? <center>
                        <div><Link to="/" className="btn btn-outline-info fw-bold mx-1 mt-3">Home</Link></div>
                        <div><Link to="/create" className="btn btn-outline-success fw-bold mx-1 mt-3">Create</Link></div>
                        <div><Link to="" className="btn btn-outline-warning fw-bold mx-1 mt-3">Contact</Link></div>
                        <div>

                            <button className="btn btn-danger fw-bold px-5 mt-3" onClick={handleLogout} >Logout</button>

                        </div>
                    </center> : <center><Link to="/login" className="btn btn-success fw-bold p-2 mt-3" >Login or Register</Link></center>}
                    <center> <button className='btn btn-info mt-5 px-5' onClick={e => handleDisplay(e)}>Close</button></center>

                </div>
            </div>
        </>
    )
}

export default Navbar