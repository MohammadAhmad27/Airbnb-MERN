import React, { useContext, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import listingContext from "../context/ListingContext"


const Edit = (props) => {
    const { id } = useParams(); // Get the dynamic parameter from the URL
    console.log("Listing ID:", id); // Log the id to ensure it's correct
    const context = useContext(listingContext);
    const { editListing } = context;
    const [listing, setListing] = useState({ id: "", etitle: "", edescription: "", eimage: "", eprice: "", elocation: "", ecountry: "" });
    const navigate = useNavigate();

    const handleSubmit = (e, currentListing) => {
        e.preventDefault();
        editListing(listing.etitle, listing.edescription, listing.eimage, listing.eprice, listing.elocation, listing.ecountry);
        setListing({ id: currentListing._id, etitle: currentListing.title, edescription: currentListing.description, eimage: currentListing.image, eprice: currentListing.price, elocation: currentListing._location, ecountry: currentListing.country });
        navigate(`/showlisting/${listing._id}`);
        props.showAlert("Listing Edited Successfully!", "success");
        console.log("button clicked")
    };

    const onChange = (e) => {
        setListing({ ...listing, [e.target.name]: e.target.value });
    };


    return (
        <>
            <div className="row">
                <div className="col-8 offset-2">
                    <br /> <br />
                    <h2 className="mb-3">Edit Listing</h2>
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" id="title" name="etitle" value={listing.etitle} onChange={onChange} placeholder="Add a catchy title" className="form-control" minLength={5} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea id="description" cols="30" rows="10" name="edescription" value={listing.edescription} onChange={onChange} placeholder="Enter your description" className="form-control" required></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image Link</label>
                            <input type="text" id="image" name="eimage" value={listing.eimage} onChange={onChange} placeholder="Enter image URL/Link" className="form-control" minLength={15} required />
                        </div>
                        {/* <div className="mb-3">
                            <label htmlFor="image" className="form-label">Uploading Listing Image</label>
                            <input type="file" id="image" name="image" className="form-control" required />
                        </div> */}
                        <div className="row">
                            <div className="mb-3 col-md-4">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input type="number" id="price" name="eprice" value={listing.eprice} onChange={onChange} placeholder="500" className="form-control" min={10} required />
                            </div>
                            <div className="mb-3 col-md-8">
                                <label htmlFor="location" className="form-label">Location</label>
                                <input type="text" id="location" name="elocation" value={listing.elocation} onChange={onChange} placeholder="Lake Lucerne region" className="form-control" minLength={3} required />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">Country</label>
                            <input type="text" id="country" name="ecountry" value={listing.ecountry} onChange={onChange} placeholder="Switzerland" className="form-control" minLength={3} required />
                        </div>

                        <button
                            disabled={listing.etitle.length < 5 || listing.edescription.length < 5 || listing.eimage.length < 15 || listing.eprice.length < 2 || listing.elocation.length < 3 || listing.ecountry.length < 3}
                            className="btn btn-danger mt-3">Add</button>
                        <br /><br />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Edit