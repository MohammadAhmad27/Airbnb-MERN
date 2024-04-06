const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");


//Connecting to Database
main().then(() => {
    console.log("Connected to MongoDB!");
})
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}


const initDB = async () => {
    await Listing.deleteMany({});
    // Remove unnecessary object wrapping
    const dataToInsert = initData.data.map((obj) => obj);
    await Listing.insertMany(dataToInsert);
    console.log("Data is initialized");
};

initDB();