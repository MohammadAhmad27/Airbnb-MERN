import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";
import Navbar from "./assets/Navbar";
import Home from "./assets/Home";
import AddNewListing from "./assets/AddNewListing";
import ListingState from "./context/ListingState";
import Alert from "./assets/Alert";
import Login from "./assets/Login";
import Signup from "./assets/Signup";
import ListingPage from "./assets/ListingPage";
import Edit from "./assets/Edit";
import NotFound from "./assets/NotFound";

function App() {
  const [alert, setAlert] = useState(null);
  const [progress, setProgress] = useState(0);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <ListingState>
        <Router>
          <Navbar showAlert={showAlert} setProgress={setProgress} />
          <LoadingBar color="#f11946" height={3} progress={progress} />
          <div style={{ marginTop: "57px" }}></div>
          <Alert alert={alert} />
          <Routes>
            <Route
              exact
              path="/"
              element={<Home showAlert={showAlert} setProgress={setProgress} />}
            />
            <Route
              exact
              path="/addnewlisting"
              element={
                <AddNewListing
                  showAlert={showAlert}
                  setProgress={setProgress}
                />
              }
            />
            <Route
              exact
              path="/showlisting/:id"
              element={
                <ListingPage showAlert={showAlert} setProgress={setProgress} />
              }
            />
            <Route
              exact
              path="/editlisting/:id"
              element={<Edit showAlert={showAlert} />}
            />
            <Route
              exact
              path="/login"
              element={<Login showAlert={showAlert} />}
            />
            <Route
              exact
              path="/signup"
              element={<Signup showAlert={showAlert} />}
            />
            {/* Wildcard route for handling all other routes */}
            <Route path="*" element={<NotFound showAlert={showAlert} />} />
          </Routes>
        </Router>
      </ListingState>
    </>
  );
}

export default App;
