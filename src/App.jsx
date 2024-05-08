import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from './assets/Navbar'
import Home from './assets/Home'
import AddNewListing from './assets/AddNewListing'
import ListingState from './context/ListingState'
import Alert from './assets/Alert'
import Login from './assets/Login'
import Signup from './assets/Signup'
import { useState } from 'react'
import ShowListing from './assets/ShowListing'

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
          <div style={{ marginTop: "57px" }}></div>
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/addnewlisting" element={<AddNewListing showAlert={showAlert} />} />
            <Route exact path="/showlisting" element={<ShowListing showAlert={showAlert} />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </Router>
      </ListingState>
    </>
  )
}

export default App






