import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/js/dist/collapse'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/offcanvas'
const Navbar = () => {
    const [account, setAcount] = useState(false)
    const handleDisplay = () => {
        if (account) {
            setAcount(false)
        } else {
            setAcount(true)
        }
    }
    return (
        <>
            <nav class="navbar navbar-expand-lg fixed-top px-4 mb-5 textstyle d-flex navbar-dark justify-content-between" style={{ boxShadow: "#ffffff6e 0px -12px 30px 2px" }}>
                <div className=''>
                    <a class="navbar-brand fs-3 fw-bolder" href="#Home">Blog App</a>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={e => handleDisplay(e)}>
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse " id="">
                    <div>
                        <Link to="" className="btn btn-outline-info fw-bold mx-1">Home</Link>
                        <Link to="" className="btn btn-outline-success fw-bold mx-1">Create</Link>
                        <Link to="" className="btn btn-outline-warning fw-bold mx-1">Contact</Link>
                    </div>
                    <div >
                        <Link to="/register" className="btn bg-dark text-light rounded-0 py-2" style={{ borderBottom: "1px solid", outline: "none" }}>Register / Login</Link>
                    </div>
                </div>
            </nav>
            <div class={`offcanvas offcanvas-end bg-dark text-light vh-100 ${account ? 'show' : 'd-block overflow-auto'}`} data-bs-scroll="true" tabindex="-1" id="navbarSupportedContent" aria-labelledby="AccountLabel">
                <div className='offcanvas-header w-100 d-flex justify-content-center mb-4' style={{ boxShadow: "#ffffff6e 10px 1px 12px 1px", zIndex: "10" }}>
                    <div>
                        <i className='bi bi-book' style={{ fontSize: "8vw" }}></i>
                        <hr />
                        <center className='fs-3 fw-bolder'>Read and Write Blog</center>
                    </div>

                </div>
                <div className=' '>
                    <center>
                        <div><Link to="" className="btn btn-outline-info fw-bold mx-1 mt-3">Home</Link></div>
                        <div><Link to="" className="btn btn-outline-success fw-bold mx-1 mt-3">Create</Link></div>
                        <div><Link to="" className="btn btn-outline-warning fw-bold mx-1 mt-3">Contact</Link></div>
                    </center>
                </div>
                <div >
                    <center>
                        <Link to="/register" className="btn bg-dark text-light rounded-0 py-2 mt-3" style={{ borderBottom: "1px solid", outline: "none" }}>Register / Login</Link>
                    </center>
                </div>
                <button className='btn btn-info mt-5' onClick={e => handleDisplay(e)}>Close</button>
            </div>
        </>
    )
}

export default Navbar