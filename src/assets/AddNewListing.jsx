import e from 'cors'
import React from 'react'

export default function AddNewListing() {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <div className="row">
                <div className="col-8 offset-2">
                    <br /> <br />
                    <h2 className="mb-3">Create a new Lisiting</h2>
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" id="title" name="title" placeholder="Add a catchy title" className="form-control" minLength={5} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea type="text" id="description" cols="30" rows="10" name="description" placeholder="Enter your description" className="form-control" minLength={5} required></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image Link</label>
                            <input type="text" id="image" name="image" placeholder="Enter image URL/Link" className="form-control" minLength={5} required />
                        </div>
                        {/* <div className="mb-3">
                            <label htmlFor="image" className="form-label">Uploading Listing Image</label>
                            <input type="file" id="image" name="image" className="form-control" required />
                        </div> */}
                        <div className="row">
                            <div className="mb-3 col-md-4">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input type="number" id="price" name="price" placeholder="500" className="form-control" minLength={2} required />
                            </div>
                            <div className="mb-3 col-md-8">
                                <label htmlFor="location" className="form-label">Location</label>
                                <input type="text" id="location" name="location" placeholder="Lake Lucerne region" className="form-control" minLength={3} required />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">Country</label>
                            <input type="text" id="country" name="country" placeholder="Switzerland" className="form-control" minLength={3} required />
                        </div>

                        <button className="btn btn-danger mt-3">Add</button>
                        <br /><br />
                    </form>
                </div>
            </div>
        </>
    )
}
