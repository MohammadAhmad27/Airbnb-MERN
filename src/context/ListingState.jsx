import ListingContext from "./ListingContext";
import { useState } from "react";

const ListingState = (props) => {
    const host = "http://localhost:8000"
    const listingInitial = []
    const [listings, setListings] = useState(listingInitial)

    // Get all Listings
    const getListings = async () => {
        // API Call 
        const response = await fetch(`${host}/listings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json()
        console.log("All Listings", json);
        setListings(json)
    }

    // Add a Listing
    const addListing = async (title, description, image, price, location, country) => {
        // TODO: API Call
        // API Call 
        const response = await fetch(`${host}/listings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, image, price, location, country })
        });

        const listing = await response.json();
        console.log("New Listing", listing);
        setListings(listings.concat(listing))
    }

    // Show Particular Listing
    const showListing = async (id) => {
        // API Call 
        const response = await fetch(`${host}/listings/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json()
        console.log("Listing", json);
        setListings(json)
    }


    // Delete a Listing
    const deleteListing = async (id) => {
        // API Call
        const response = await fetch(`${host}/listings/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = response.json();
        console.log("Deleted Listing", json);
        const newListings = listings.filter((listing) => { return listing._id !== id })
        setListings(newListings)
    }

    // Edit a Listing
    const editListing = async (id, title, description, image, price, location, country) => {
        // API Call 
        const response = await fetch(`${host}/listings/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, image, price, location, country })
        });
        const json = await response.json();
        console.log("Edited Listing", json);
        let newListings = JSON.parse(JSON.stringify(listings))
        // Logic to edit in client
        for (let index = 0; index < newListings.length; index++) {
            const element = newListings[index];
            if (element._id === id) {
                newListings[index].title = title;
                newListings[index].description = description;
                newListings[index].image = image;
                newListings[index].price = price;
                newListings[index].location = location;
                newListings[index].country = country;
                break;
            }
        }
        setListings(newListings);
    }

    return (
        <ListingContext.Provider value={{ listings, getListings, addListing, showListing, deleteListing, editListing }}>
            {props.children}
        </ListingContext.Provider>
    )

}
export default ListingState;