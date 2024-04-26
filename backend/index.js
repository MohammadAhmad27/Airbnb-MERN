if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
const express = require('express')
const mongoose = require("mongoose");
var cors = require('cors')
const listingRouter = require("./routes/listing.js")
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



app.use("/listings", listingRouter);










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



//Rendering Signup Form
app.get("/signup", (req, res) => {
    // res.render("users/signup.ejs");
});



// After entering data redirect to all listings page
app.post("/signup", async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            // req.flash("success", "Welcome to wanderlust!");
            // res.redirect("/listings");
        });
    } catch (error) {
        console.log(error.message);
        res.send(error);
    }
});


//Rendering Login Form
app.get("/login",(req, res) => {
    // res.render("users/login.ejs");
});


// After entering data redirect to all listings page
app.post("/login",async (req, res) => {
    req.flash("success", "Welcome back to wanderlust! You're logged in");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
});




//Listening on port 8080
app.listen(port, () => {
    console.log(`airbnb backend is listening at http://localhost:${port}`)
})