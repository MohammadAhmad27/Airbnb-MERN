const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js")
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');
const multer = require('multer')
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage })


//Home route where all listings are showing
//Successfully tested using Thunder Client
router.get("/", async (req, res) => {
    const allListings = await Listing.find({});
    res.send({ allListings });
});

//Home route where any new listing will be shown after creating
// Not Successfully tested using Thunder Client, got some error
router.post("/", upload.single("listing[image]"), async (req, res, next) => {
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
router.get("/new", (req, res) => {
    console.log(req.user);
    res.send(req.user);
    // res.render("new.ejs"); 
});


// Rendering Show listing code page
// Successfully tested using Thunder Client
router.get("/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    console.log(listing);
    res.send(listing)
    // res.render("show.ejs", { listing });
});


// Updating Listing Code
// Not Successfully tested using Thunder Client, got some error
router.put("/:id", upload.single("listing[image]"), async (req, res) => {
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
router.delete("/:id", async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(`Listing Deleted Successfully! ${deletedListing}`)
    res.send(deletedListing);
    // res.redirect("/listings");
});


// Edit Form Code
router.get("/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
    // res.render("edit.ejs", { listing, originalImageUrl });
});






module.exports = router;