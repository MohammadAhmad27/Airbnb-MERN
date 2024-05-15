import ListingContext from "./ListingContext";
import { useState } from "react";

const ListingState = (props) => {
  const host = "http://localhost:8000";
  const listingInitial = [];
  const [listings, setListings] = useState(listingInitial);

  // Get all Listings
  const getListings = async () => {
    // API Call
    const response = await fetch(`${host}/listings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log("All Listings:", json.allListings);
    setListings(json.allListings);
  };

  // Add a Listing
  const addListing = async (formData) => {
    const response = await fetch(`${host}/listings`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
      body: formData,
    });

    const listing = await response.json();
    console.log("NewListing:", listing);
    setListings([...listings, listing]); // Append the new listing to the existing listings
  };

  // Show Particular Listing
  const showListing = async (id) => {
    // API Call
    const response = await fetch(`${host}/listings/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log("Listing", json);
    return json; // Return the specific listing data
  };

  // Delete a Listing
  const deleteListing = async (id) => {
    // API Call
    const response = await fetch(`${host}/listings/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log("Deleted Listing", json);
    const newListings = listings.filter((listing) => {
      return listing._id !== id;
    });
    setListings(newListings);
  };

  // Edit a Listing
  const editListing = async (
    id,
    title,
    description,
    image,
    price,
    location,
    country
  ) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image); // Only append if image is provided
    formData.append("price", price);
    formData.append("location", location);
    formData.append("country", country);

    // API Call
    const response = await fetch(`${host}/listings/${id}`, {
      method: "PUT",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
      body: formData,
    });

    const json = await response.json();
    console.log("Updated Listing", json);
    let newListings = JSON.parse(JSON.stringify(listings));
    for (let index = 0; index < newListings.length; index++) {
      const element = newListings[index];
      if (element._id === id) {
        newListings[index] = json; // Replace the updated listing
        break;
      }
    }
    setListings(newListings);
  };

  return (
    <ListingContext.Provider
      value={{
        listings,
        getListings,
        addListing,
        showListing,
        deleteListing,
        editListing,
      }}
    >
      {props.children}
    </ListingContext.Provider>
  );
};

export default ListingState;
