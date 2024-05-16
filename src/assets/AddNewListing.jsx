import React, { useContext, useState, useEffect, useRef } from "react";
import listingContext from "../context/ListingContext";
import { useNavigate } from "react-router-dom";

export default function AddNewListing({ showAlert }) {
  const context = useContext(listingContext);
  const { addListing } = context;
  const [listing, setListing] = useState({
    title: "",
    description: "",
    image: null,
    price: "",
    location: "",
    country: "",
  });
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", listing.title);
    formData.append("description", listing.description);
    formData.append("image", listing.image);
    formData.append("price", listing.price);
    formData.append("location", listing.location);
    formData.append("country", listing.country);
  
    // Add the listing without waiting for its completion
    addListing(formData);
    navigate("/");
    showAlert("Listing Added Successfully!", "success");
    setListing({
      title: "",
      description: "",
      image: null,
      price: "",
      location: "",
      country: "",
    });
  };
  
  const onChange = (e) => {
    if (e.target.name === "image") {
      setListing({ ...listing, image: e.target.files[0] });
    } else {
      setListing({ ...listing, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    // Redirect to login page if user is not logged in
    if (!localStorage.getItem("token")) {
      navigate("/login");
      showAlert("Please Login to Add New Listing!", "danger");
    } else {
      showAlert("Please Add New Listing!", "success");
    }
  }, []); // Run only once when component mounts

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="row">
      <div className="col-8 offset-2">
        <br /> <br />
        <h2 className="mb-3">Create a New Listing</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              ref={inputRef}
              value={listing.title}
              onChange={onChange}
              placeholder="Add a catchy title"
              className="form-control"
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              cols="30"
              rows="10"
              name="description"
              value={listing.description}
              onChange={onChange}
              placeholder="Enter your description"
              className="form-control"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Uploading Listing Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={onChange}
              className="form-control"
              required
            />
          </div>
          <div className="row">
            <div className="mb-3 col-md-4">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={listing.price}
                onChange={onChange}
                placeholder="500"
                className="form-control"
                min={10}
                required
              />
            </div>
            <div className="mb-3 col-md-8">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={listing.location}
                onChange={onChange}
                placeholder="Lake Lucerne region"
                className="form-control"
                minLength={3}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={listing.country}
              onChange={onChange}
              placeholder="Switzerland"
              className="form-control"
              minLength={3}
              required
            />
          </div>
          <button
            disabled={
              listing.title.length < 5 ||
              listing.description.length < 5 ||
              listing.price.length < 2 ||
              listing.location.length < 3 ||
              listing.country.length < 3
            }
            className="btn btn-danger mt-3"
          >
            Add
          </button>
          <br />
          <br />
        </form>
      </div>
    </div>
  );
}
