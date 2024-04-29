if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
const express = require('express')
const mongoose = require("mongoose");
var cors = require('cors')
const Listing = require("./models/listing.js")
const listingRouter = require("./routes/listing.js")
const userRouter = require("./routes/user.js")
const methodOverride = require("method-override")
const path = require("path")
const app = express()
const port = 8000

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


// Requiring listing.js & user.js from routes folder
app.use("/listings", listingRouter);
app.use("/", userRouter);



// app.get("/message", (req, res) => {
//     res.json({ message: "Hello from server!" });
//   });
  


//Code to save sample listing in MongoDB 
// app.get("/samplelisting", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "Cozy Beachfront Cottage",
//         description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
//         image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
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