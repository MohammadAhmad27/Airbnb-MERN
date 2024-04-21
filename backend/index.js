require('dotenv').config()


const express = require('express')
const mongoose = require("mongoose");
var cors = require('cors') 
const Listing = require("./models/listing.js")
const multer = require('multer')
const { storage } = require("./cloudConfig.js")
const upload = multer({ storage })
const methodOverride = require("method-override")
const path = require("path")
const app = express()
const port = 3000

//Connecting to MongoDB 
main().then(() => {
    console.log("Connected to MongoDB!");
})
    .catch((err) => {
        console.log(err);
    });

async function main() {
    // await mongoose.connect(dbUrl);
    await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}

// Using cors to connect Frontend with Backend and running both servers together (npm run both)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


//Home route where all listings are showing
//Successfully tested using Thunder Client
app.get("/", async (req, res) => {
    const allListings = await Listing.find({});
    res.send({ allListings });
});

//Home route where any new listing will be shown after creating
// Not Successfully tested using Thunder Client, got some error
app.post("/", upload.single("listing[image]"), async (req, res, next) => {
    try {
        let url = req.file.path;
        let filename = req.file.filename;
        const newListing = new Listing(req.body.listing);
        newListing.image = { url, filename }
        let savedListing = await newListing.save();
        console.log(savedListing);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Sorry, Internal server error!" });
    }
});

// Rendering/Showing Form for creating new listing
// Successfully tested using Thunder Client
app.get("/new",  (req, res) => {
    console.log(req.user);
    res.send(req.user);
   // res.render("new.ejs"); 
});


// Rendering Show listing code page
// Successfully tested using Thunder Client
app.get("/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    console.log(listing);
    res.send(listing)
    // res.render("show.ejs", { listing });
});


// Updating Listing Code
// Not Successfully tested using Thunder Client, got some error
app.put("/:id", upload.single("listing[image]"), async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename }
        await listing.save();
    }
    console.log(listing)
    res.send(listing);
 //   res.redirect(`/listings/${id}`);
});


// Deleting Listing Code
// Successfully tested using Thunder Client
app.delete("/:id",  async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(`Listing Deleted Successfully! ${deletedListing}`)
    res.send(deletedListing);
   // res.redirect("/listings");
});


// Edit Form Code
app.get("/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
   // res.render("edit.ejs", { listing, originalImageUrl });
});





//Code to save testing listing in MongoDB 
// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "Cozy Beachfront Cottage",
//         description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
//         image: {
//             filename: "listingimage",
//             url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
//         },
//         price: 3000,
//         location: "Malibu",
//         country: "United States",
//     });
//     await sampleListing.save()
//         .then(() => {
//             console.log("Sample saved into DB");
//         })
//         .catch((error) => {
//             console.log(error.message);
//         });
//     res.send("Successful testing");
// });







//Listening on port 8080
app.listen(port, () => {
    console.log(`airbnb backend is listening at http://localhost:${port}`)
})