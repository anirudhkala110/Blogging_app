import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark text-light px-1 d-flex justify-content-between" style={{ boxShadow: "#ffffff6e 0px -12px 30px 2px" }}>
                <a class="navbar-brand fs-3 fw-bolder" href="#Home">Blog App</a>
                <div>
                    <Link to="" className="btn btn-outline-info fw-bold mx-1">Home</Link>
                    <Link to="" className="btn btn-outline-success fw-bold mx-1">Create</Link>
                    <Link to="" className="btn btn-outline-warning fw-bold mx-1">Contact</Link>
                </div>
                <div >
                    <Link to="/register" className="btn bg-dark text-light rounded-0 py-2" style={{ borderBottom: "1px solid", outline: "none" }}>Register / Login</Link>
                </div>
            </nav>
        </>
    )
}

export default Navbar