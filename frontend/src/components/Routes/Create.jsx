import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css/'
const Create = () => {
    const handleSubmit = () => {

    }
    return (
        <div>
            <div className='container w-100 d-flex justify-content-center align-items-center' style={{ height: "90vh" }}>
                <form onSubmit={handleSubmit} className='border shadow p-3'>
                    <center className='fs-3 fw-bolder'>New Blog</center>
                    <div className='input-group'>
                        <label className='form-label fw-bold text-center w-100 border-bottom border-dark p-2 text-uppercase bg-info rounded-top rounded-top-circle '>Title</label>
                        <input type='text' placeholder='T i t l e' className='form-control my-2 w-100' />
                    </div>
                    <div className='input-group'>
                        <textarea cols='80' rows='10'></textarea>
                    </div>
                    <div class="custom-file">
                        <input type="file" class="btn form-control py-2 px-3 btn-outline-primary my-3" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
                    </div>
                    <button type='submit' className='btn btn-success w-100'>Upload</button>
                </form>
            </div>
        </div>
    )
}

export default Create