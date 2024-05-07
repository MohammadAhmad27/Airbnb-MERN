import React from 'react';

const ListingItem = (props) => {
    const { listing } = props;

    return (
        <div className="col-lg-4 col-md-6 col-sm-12 mt-4">
            <a href={`/listings/${listing._id}`} className="listing-link">
                <div className="card listing-card">
                    <img src={listing.image} className="card-img-top" alt="listing" style={{ height: "18rem" }} />
                    <div className="card-body">
                        <p className="card-text">
                            <b>{listing.title}</b><br />
                            ${listing.price.toLocaleString("en-US")} /night
                        </p>
                    </div>
                </div>
            </a>
            
        </div>
    );
};

export default ListingItem;
