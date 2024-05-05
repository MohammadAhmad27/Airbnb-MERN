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
                            <input name="title" placeholder="Add a catchy title" type="text" className="form-control"
                                required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea cols="30" rows="10" name="listing[description]" placeholder="Enter your description"
                                type="text" className="form-control" required></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image Link</label>
                            <input name="listing[image]" placeholder="Enter image URL/Link" type="text"
                                className="form-control" />
                        </div>
                        {/* <div className="mb-3">
                    <label htmlFor="image" className="form-label">Uploading Listing Image</label>
                    <input name="listing[image]" type="file" className="form-control" required />
                </div> */}
                        <div className="row">
                            <div className="mb-3 col-md-4">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input type="number" name="listing[price]" placeholder="500" className="form-control" required />
                            </div>
                            <div className="mb-3 col-md-8">
                                <label htmlFor="location" className="form-label">Location</label>
                                <input name="listing[location]" placeholder="Lake Lucerne region" type="text"
                                    className="form-control" required />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">Country</label>
                            <input name="listing[country]" placeholder="Switzerland" type="text" className="form-control"
                                required />
                        </div>

                        <button className="btn btn-danger mt-3">Add</button>
                        <br /><br />
                    </form>
                </div>
            </div>
        </>
    )
}
