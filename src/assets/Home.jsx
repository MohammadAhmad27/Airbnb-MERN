import Header from "./Header";
import Footer from "./Footer";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import listingContext from "../context/ListingContext";
import ListingItem from "./ListingItem";

export default function Home({ showAlert }) {
  const context = useContext(listingContext);
  const navigate = useNavigate();
  const { listings, getListings } = context;

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      showAlert(" Please Login to see All Listings!", "danger");
    } else {
      getListings();
    }
  }, []);

  return (
    <>
      <Header />

      <div className="row mx-4">
        {listings?.map((listing) => (
          <ListingItem key={listing._id} listing={listing} />
        ))}
      </div>

      <Footer />
    </>
  );
}
