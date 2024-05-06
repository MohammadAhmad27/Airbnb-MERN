import e from 'cors'
import React, { useContext, useState, useEffect } from 'react'
import listingContext from "../context/ListingContext"
import { useNavigate } from 'react-router-dom';

export default function AddNewListing(props) {
    const context = useContext(listingContext);
    const { addListing } = context;
    const [listing, setListing] = useState({ title: "", description: "", image: "", price: "", location: "", country: "" });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addListing(listing.title, listing.description, listing.image, listing.price, listing.location, listing.country);
        setListing({ title: "", description: "", image: "", price: "", location: "", country: "" });
        navigate("/");
        console.log("Listing Added!")
        props.showAlert(" Listing Added Successfully!", "success");
    }

    const onChange = (e) => {
        setListing({ ...listing, [e.target.name]: e.target.value });
    }


    useEffect(() => {
        // Redirect to login page if user is not logged in
        if (!localStorage.getItem('token')) {
            navigate('/login');
        } else {
            props.showAlert(" Please Add a Listing!", "success")
        }
    }, []); // Run only once when component mounts

    return (
        <>
            <div className="row">
                <div className="col-8 offset-2">
                    <br /> <br />
                    <h2 className="mb-3">Create a new Lisiting</h2>
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" id="title" name="title" value={listing.title} onChange={onChange} placeholder="Add a catchy title" className="form-control" minLength={5} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea type="text" id="description" cols="30" rows="10" name="description" value={listing.description} onChange={onChange} placeholder="Enter your description" className="form-control" minLength={5} required></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image Link</label>
                            <input type="text" id="image" name="image" value={listing.image} onChange={onChange} placeholder="Enter image URL/Link" className="form-control" minLength={5} required />
                        </div>
                        {/* <div className="mb-3">
                            <label htmlFor="image" className="form-label">Uploading Listing Image</label>
                            <input type="file" id="image" name="image" className="form-control" required />
                        </div> */}
                        <div className="row">
                            <div className="mb-3 col-md-4">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input type="number" id="price" name="price" value={listing.price} onChange={onChange} placeholder="500" className="form-control" minLength={2} required />
                            </div>
                            <div className="mb-3 col-md-8">
                                <label htmlFor="location" className="form-label">Location</label>
                                <input type="text" id="location" name="location" value={listing.location} onChange={onChange} placeholder="Lake Lucerne region" className="form-control" minLength={3} required />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">Country</label>
                            <input type="text" id="country" name="country" value={listing.country} onChange={onChange} placeholder="Switzerland" className="form-control" minLength={3} required />
                        </div>

                        <button className="btn btn-danger mt-3">Add</button>
                        <br /><br />
                    </form>
                </div>
            </div>
        </>
    )
}
