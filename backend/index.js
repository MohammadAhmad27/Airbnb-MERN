const express = require('express')
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const multer = require('multer')
const { storage } = require("./cloudConfig.js")
const upload = multer({ storage })
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
        if (typeof req.file !== "undefined") {
            let url = req.file.path;
            let filename = req.file.filename;
            const newListing = new Listing(req.body.listing);
            newListing.image = { url, filename }
            let savedListing = await newListing.save();
            console.log(savedListing);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }

});












//Home Get testListing Route
// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India",
//     });
//     await sampleListing.save()
//     .then(()=> {
//         console.log("Sample saved into DB");
//     })
//     .catch((error)=> {
//         console.log(error.message);
//     });
//     res.send("Successful testing");
// });


//Listening on port 8080
app.listen(port, () => {
    console.log(`airbnb backend is listening at http://localhost:${port}`)
})