import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from './assets/Navbar'
import Footer from './assets/Footer'
import Home from './assets/Home'
import AddNewListing from './assets/AddNewListing'
import ListingState from './context/ListingState';
import Alert from './assets/Alert';
import Login from './assets/Login'
import Signup from './assets/Signup'
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <ListingState>
        <Router>
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/addnewlisting" element={<AddNewListing showAlert={showAlert} />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
          <Footer />
        </Router>
      </ListingState>
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





