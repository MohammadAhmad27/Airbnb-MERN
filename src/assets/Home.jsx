import Header from "./Header"
import Footer from './Footer'
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import listingContext from "../context/ListingContext";
import ListingItem from './ListingItem';

export default function Home(props) {
  const context = useContext(listingContext);
  const navigate = useNavigate();
  const { listings, getListings } = context;

  console.log('context', context);
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login");
      props.showAlert(" Please Login to see All Listings!", "danger")
    } else {
      getListings()
    }
    // eslint-disable-next-line
  }, []);

  console.log("Listings length:", listings.allListings);
  return (
    <>
      <Header />

      <div className="row mx-4">
        {listings.allListings?.map((listing) => (
          <ListingItem key={listing._id} listing={listing} />
        ))}
      </div>


      <Footer />
    </>
  );
}
