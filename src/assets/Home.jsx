import Header from "./Header"
import Footer from './Footer'
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import listingContext from "../context/ListingContext";

export default function Home(props) {
  const context = useContext(listingContext);
  const { listings, getListings } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login");
      props.showAlert(" Please Login to see All Listings!", "danger")
    } else {
      getListings()
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      {/* <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 mt-3">
        {Array.isArray(listings) && listings.length > 0 ? (
          listings.map((listing) => (
            <a href={`/listings/${listing._id}`} className="listing-link" key={listing._id}>
              <div className="card listing-card">
                <img src={listing.image.url} className="card-img-top" alt="listing" style={{ height: "20rem" }} />
                <div className="card-img-overlay">maaanaaa</div>
                <div className="card-body">
                  <p className="card-text">
                    <b>{listing.title}</b><br />
                    &dollar;{listing.price.toLocaleString("en-US")} /night
                    <i className="tax-info">&nbsp; +18% GST</i>
                  </p>
                </div>
              </div>
            </a>
          ))
        ) : (
          <h1>Hello</h1>
        )}
      </div> */}
      <Footer />
    </>
  );
}
