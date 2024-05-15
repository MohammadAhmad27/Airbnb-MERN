const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js")
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');
const multer = require('multer')
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage })


//GET Route where all listings are showing
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

//POST Route where new listing will be shown after creation
//Successfully tested using Thunder Client
//body('image', 'Image URL must be more than 15 characters').isLength({ min: 15 }),
router.post("/", fetchUser, upload.single("image"), [
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
    body('price', 'Price must be greater than 10').isNumeric().isInt({ min: 10 }),
    body('location', 'Location must be at least 3 characters').isLength({ min: 3 }),
    body('country', 'Country must be at least 3 characters').isLength({ min: 3 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, price, location, country } = req.body;
        const url = req.file.path;
        const filename = req.file.filename;

        const newListing = new Listing({
            title,
            description,
            image: { url, filename },
            price,
            location,
            country,
            user: req.user.id
        });

        let savedListing = await newListing.save();
        res.send(savedListing);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Sorry, Internal server error!" });
    }
});



//GET Route where particular listing details will be shown
//Successfully tested using Thunder Client
router.get("/:id", async (req, res) => {
    try {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        console.log(listing);
        res.send(listing)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Sorry, Internal server error!" });
    }
});


router.put("/:id", fetchUser, upload.single("image"), async (req, res) => {
    const { title, description, price, location, country } = req.body;
    const newListing = {};

    if (title) { newListing.title = title; }
    if (description) { newListing.description = description; }
    if (price) { newListing.price = price; }
    if (location) { newListing.location = location; }
    if (country) { newListing.country = country; }
    if (req.file) {
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    try {
        let updatedListing = await Listing.findById(req.params.id);
        if (!updatedListing) { return res.status(404).send("Not Found"); }

        if (updatedListing.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            { $set: newListing },
            { new: true }
        );

        res.send(updatedListing);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Sorry, Internal server error!" });
    }
});




// DELETE Route to deleting a listing 
// Successfully tested using Thunder Client
router.delete("/:id", fetchUser, async (req, res) => {
    try {
        // Find the listing to be delete and delete it
        let { id } = req.params;
        let deletedListing = await Listing.findById(id);
        if (!deletedListing) { return res.status(404).send("Not Found") }
        // Allow deletion only if user owns this listing
        if (deletedListing.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        //delete via id
        deletedListing = await Listing.findByIdAndDelete(id)
        res.send({ "Success": "Lisitng has been deleted", deletedListing: deletedListing });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Sorry, Internal server error!" });
    }
});


module.exports = router;