import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import listingContext from "../context/ListingContext";

const Edit = ({ showAlert }) => {
  const { id } = useParams();
  const context = useContext(listingContext);
  const { showListing, editListing } = context;
  const [listing, setListing] = useState({
    id: "",
    etitle: "",
    edescription: "",
    eimage: "",
    eprice: "",
    elocation: "",
    ecountry: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const currentListing = await showListing(id);
        setListing({
          id: currentListing._id,
          etitle: currentListing.title,
          edescription: currentListing.description,
          eimage: currentListing.image,
          eprice: currentListing.price,
          elocation: currentListing.location,
          ecountry: currentListing.country,
        });
      } catch (error) {
        console.error("Error fetching listing:", error);
        showAlert("Error fetching listing.", "danger");
      }
    };

    fetchListing();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", listing.etitle);
    formData.append("description", listing.edescription);
    if (listing.eimage) formData.append("image", listing.eimage);
    formData.append("price", listing.eprice);
    formData.append("location", listing.elocation);
    formData.append("country", listing.ecountry);

    editListing(
      listing.id,
      listing.etitle,
      listing.edescription,
      listing.eimage,
      listing.eprice,
      listing.elocation,
      listing.ecountry
    );
    navigate(`/showlisting/${listing.id}`);
    showAlert("Listing Edited Successfully!", "success");
  };

  const onChange = (e) => {
    if (e.target.name === "eimage") {
      setListing({ ...listing, eimage: e.target.files[0] });
    } else {
      setListing({ ...listing, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="row">
      <div className="col-8 offset-2">
        <br /> <br />
        <h2 className="mb-3">Edit Listing</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="etitle"
              value={listing.etitle}
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
              cols="30"
              rows="10"
              id="description"
              name="edescription"
              value={listing.edescription}
              onChange={onChange}
              placeholder="Enter your description"
              className="form-control"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="eimage"
              onChange={onChange}
              className="form-control"
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
                name="eprice"
                value={listing.eprice}
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
                name="elocation"
                value={listing.elocation}
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
              name="ecountry"
              value={listing.ecountry}
              onChange={onChange}
              placeholder="Switzerland"
              className="form-control"
              minLength={3}
              required
            />
          </div>
          <button
            disabled={
              listing.etitle.length < 5 ||
              listing.edescription.length < 5 ||
              listing.eprice.length < 2 ||
              listing.elocation.length < 3 ||
              listing.ecountry.length < 3
            }
            className="btn btn-danger mt-3"
          >
            Save Changes
          </button>
          <br />
          <br />
        </form>
      </div>
    </div>
  );
};

export default Edit;
