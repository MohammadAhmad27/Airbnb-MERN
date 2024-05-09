import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import listingContext from '../context/ListingContext';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";

const ListingPage = (props) => {
  const { id } = useParams(); // Get the dynamic parameter from the URL
  console.log("Listing ID:", id); // Log the id to ensure it's correct
  const context = useContext(listingContext);
  const { showListing, deleteListing } = context;
  const [listing, setListing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await showListing(id);
        setListing(data);
      } catch (error) {
        console.error("Error fetching listing:", error); // Log any errors that occur
      }
    };
    fetchData();
  }, [id]);

  if (!listing) return <div>Loading...</div>;

  return (
    <>
      <div className="row">
        <div className="col-8 offset-3">
          <h3>{listing.title}</h3>
        </div>
        <div className="card col-6 offset-3 show-card listing-card">
          <img src={listing.image} className="card-img-top show-img" alt="listing" />
          <div className="card-body">
            <p className="card-text">{listing.description}</p>
            <p className="card-text">${listing.price.toLocaleString("en-US")}</p>
            <p className="card-text">{listing.location}</p>
            <p className="card-text">{listing.country}</p>
          </div>
        </div>
      </div>


      <div className='offset-3'>
        <Stack direction="row" spacing={5} >
          <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => {
            deleteListing(listing._id);
            props.showAlert('Listing Deleted Successfully!', 'success');
            navigate("/");
          }}>
            Delete
          </Button>
          <Button variant="contained" color="error" endIcon={<EditIcon />}>
            Edit
          </Button>
        </Stack>
      </div>

    </>
  );
};

export default ListingPage;
