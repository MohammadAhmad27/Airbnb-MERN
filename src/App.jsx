import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddNewListing from "./components/AddNewListing";
import ListingState from "./context/ListingState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ListingPage from "./components/ListingPage";
import Edit from "./components/Edit";
import NotFound from "./components/NotFound";

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
