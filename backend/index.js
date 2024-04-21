require('dotenv').config()


const express = require('express')
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const multer = require('multer')
const { storage } = require("./cloudConfig.js")
const upload = multer({ storage })
const path = require("path")
const app = express()
const port = 3000

//Connecting to Database
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

app.get("/", async (req, res) => {
    const allListings = await Listing.find({});
    res.send({ allListings });
});

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