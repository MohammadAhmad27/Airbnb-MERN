import React from "react";
import { Link } from "react-router-dom";

const ListingItem = ({ listing }) => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mt-4">
      <Link to={`/showlisting/${listing._id}`} className="listing-link">
        <div className="card listing-card">
          <img
            src={listing.image}
            className="card-img-top"
            alt="listing"
            style={{ height: "18rem" }}
          />
          <div className="card-body">
            <p className="card-text">
              <b>{listing.title}</b>
              <br />${listing.price.toLocaleString("en-US")}/night
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;
