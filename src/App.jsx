import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from './assets/Navbar'
import Footer from './assets/Footer'
import Home from './assets/Home'
import AddNewListing from './assets/AddNewListing'


function App() {

  return (
    <>
      <Router>
        <Navbar />
      
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addnewlisting" element={<AddNewListing />} />
        </Routes>
        <Footer />
      </Router>

    </>
  )
}

export default App



// import React, { useState, useEffect } from "react";
// import "./App.css";

// function App() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:3000/message")
//       .then((res) => res.json())
//       .then((data) => setMessage(data.message));
//   }, []);

//   return (
//     <div className="App">
//       <h1>{message}</h1>
//     </div>
//   );
// }

// export default App





