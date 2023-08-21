import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css/'
const Create = () => {
    const handleSubmit = () => {

    }
    return (
        <div>
            <div className='container w-100 d-flex justify-content-center align-items-center border' style={{ height: "90vh" }}>
                <form onSubmit={handleSubmit} className='border p-3'>
                    <center className='fs-3 fw-bolder'>New Blog</center>
                    <div className='input-group'>
                        <input type='text' className='form-control my-2' />
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