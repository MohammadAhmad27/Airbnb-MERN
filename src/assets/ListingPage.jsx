import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import listingContext from '../context/ListingContext';

const ListingPage = () => {
  const { id } = useParams(); // Get the dynamic parameter from the URL
  console.log("Listing ID:", id); // Log the id to ensure it's correct
  const context = useContext(listingContext);
  const { showListing } = context;
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await showListing(id);
        console.log("Listing Data:", data); // Log the data received from showListing
        setListing(data);
      } catch (error) {
        console.error("Error fetching listing:", error); // Log any errors that occur
      }
    };
    fetchData();
  }, [id]);

  if (!listing) return <div>Loading...</div>;

  return (
    <div>
      <div className="row mt-3">
        <div className="col-8 offset-3 mt-3">
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
    </div>
  );
};

export default ListingPage;
