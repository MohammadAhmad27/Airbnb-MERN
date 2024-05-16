import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import listingContext from "../context/ListingContext";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";

const ListingPage = ({ showAlert }) => {
  const { id } = useParams(); // Get the dynamic parameter from the URL
  console.log("Listing ID:", id); // Log the id to ensure it's correct
  const context = useContext(listingContext);
  const { showListing, deleteListing } = context;
  const [listing, setListing] = useState(null);
  const navigate = useNavigate();

  //Fetching listing
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await showListing(id);
        setListing(data);
      } catch (error) {
        console.error("Error fetching listing:", error);
        showAlert("Error fetching listing.", "danger");
      }
    };
    fetchData();
  }, []);

  const isOwner = () => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    if (!token) return false;
    const decodedToken = parseJwt(token);
    console.log("compare", decodedToken.user.id === listing.user);
    console.log(typeof decodedToken.user.id);
    console.log(typeof listing.user);
    console.log("user", decodedToken.user.id);
    console.log("user1", listing.user);
    return decodedToken?.user.id?.toString() === listing?.user?.toString();
  };

  const parseJwt = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  //When data takes time to fetch from backend
  if (!listing) {
    return <></>
  }

  return (
    <>
      <div className="row">
        <div className="col-8 offset-3">
          <h3>{listing.title}</h3>
        </div>
        <div className="card col-6 offset-3 show-card listing-card">
          <img
            src={listing.image.url}
            className="card-img-top show-img"
            alt="listing"
          />
          <div className="card-body">
            <p className="card-text mt-2">{listing.description}</p>
            <p className="card-text">
              ${listing.price.toLocaleString("en-US")}
            </p>
            <p className="card-text">{listing.location}</p>
            <p className="card-text">{listing.country}</p>
          </div>
        </div>
      </div>

      <div className="offset-3">
        <Stack direction="row" spacing={5}>
          {isOwner() && (
            <>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  deleteListing(listing._id);
                  showAlert("Listing Deleted Successfully!", "success");
                  navigate("/");
                }}
              >
                Delete
              </Button>
              <Link to={`/editlisting/${listing._id}`}>
                <Button
                  variant="contained"
                  color="error"
                  endIcon={<EditIcon />}
                >
                  Edit
                </Button>
              </Link>
            </>
          )}
        </Stack>
      </div>
    </>
  );
};

export default ListingPage;
