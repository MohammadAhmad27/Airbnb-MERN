const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js")
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');
// const multer = require('multer')
// const { storage } = require("../cloudConfig.js")
// const upload = multer({ storage })


//Home route where all listings are showing
//Successfully tested using Thunder Client
router.get("/", async (req, res) => {
    try {
        const allListings = await Listing.find({});
        res.send({ allListings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Sorry, Internal server error!" });
    }
});

//Home route where new listing will be shown after creating
//Successfully tested using Thunder Client
//upload.single("listing[image]")
router.post("/", fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
    body('image', 'Image URL must be more than 15 characters').isLength({ min: 15 }),
    body('price', 'Price must be atleast 2 characters').isLength({ min: 2 }),
    body('location', 'Location must be atleast 3 characters').isLength({ min: 3 }),
    body('country', 'Description must be atleast 3 characters').isLength({ min: 3 })
], async (req, res, next) => {
    try {
        // let url = req.file.path;
        // let filename = req.file.filename;
        const { title, description, image, price, location, country } = req.body;
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const newListing = new Listing({
            title, description, image, price, location, country, user: req.user.id
        });
        // newListing.image = { url, filename }
        let savedListing = await newListing.save();
        console.log(savedListing);
        res.send(savedListing);

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
    try {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        console.log(listing);
        res.send(listing)
        // res.render("show.ejs", { listing });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Sorry, Internal server error!" });
    }
});


// Updating Listing Code
// Successfully tested using Thunder Client, got some error
router.put("/:id", fetchUser, async (req, res) => {
    const { title, description, price, image, location, country } = req.body;
    try {
        // Create a newListing object
        const newListing = {};
        if (title) { newListing.title = title };
        if (description) { newListing.description = description };
        if (image) { newListing.image = image };
        if (price) { newListing.price = price };
        if (location) { newListing.location = location };
        if (country) { newListing.country = country };

        // Find the listing to be updated and update it
        let updatedListing = await Listing.findById(req.params.id);
        if (!updatedListing) { return res.status(404).send("Not Found") }

        if (updatedListing.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        updatedListing = await Listing.findByIdAndUpdate(req.params.id, { $set: newListing }, { new: true })
        // res.json({ listing });
        await updatedListing.save();
        console.log(updatedListing)
        res.send(updatedListing);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Sorry, Internal server error!" });
    }

});


// Deleting Listing Code
// Successfully tested using Thunder Client
router.delete("/:id", fetchUser, async (req, res) => {
    try {
        // Find the listing to be delete and delete it
        let { id } = req.params;
        let deletedListing = await Listing.findById(id);
        if (!deletedListing) { return res.status(404).send("Not Found") }
        // Allow deletion only if user owns this Note
        if (deletedListing.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        //delete via id
        deletedListing = await Listing.findByIdAndDelete(id)
        res.send({ "Success": "Lisitng has been deleted", deletedListing: deletedListing });
        // res.redirect("/listings");
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Sorry, Internal server error!" });
    }
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