import Header from "./Header";
import Footer from "./Footer";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import listingContext from "../context/ListingContext";
import ListingItem from "./ListingItem";

export default function Home({ showAlert, setProgress }) {
  const context = useContext(listingContext);
  const navigate = useNavigate();
  const { listings, getListings } = context;

  useEffect(() => {
    const handleNotLoggedIn = async () => {
      try {
        setProgress(20);
        await new Promise((resolve) => setTimeout(resolve, 100));
        navigate("/login");
        showAlert(" Please Login to see All Listings!", "danger");
        setProgress(100);
      } catch (error) {
        setProgress(0);
        showAlert("Error processing request.", "danger");
      }
    };

    const fetchListings = async () => {
      try {
        setProgress(20);
        await getListings();
        setProgress(100);
      } catch (error) {
        setProgress(0);
        showAlert("Error fetching listings.", "danger");
      }
    };

    if (!localStorage.getItem("token")) {
      handleNotLoggedIn();
    } else {
      fetchListings();
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
