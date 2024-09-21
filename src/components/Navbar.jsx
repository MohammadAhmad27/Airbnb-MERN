import React from "react";
import Button from "@mui/material/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ showAlert, setProgress }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    setProgress(20);
    await new Promise((resolve) => setTimeout(resolve, 100)); // Introduce a short delay
    localStorage.removeItem("token");
    showAlert("Logged out Successfully!", "success");
    navigate("/login");
    setProgress(100);
  };

  const handleNavigate = async (path) => {
    setProgress(20);
    await new Promise((resolve) => setTimeout(resolve, 100)); // Introduce a short delay
    navigate(path);
    setProgress(100);
  };

  let location = useLocation();
  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="https://picjj.com/images/2024/05/09/s5uHu.png"
              alt="navbar-brand"
              style={{ width: "85px" }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/addnewlisting" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/addnewlisting"
                >
                  Add New Listing
                </Link>
              </li>
            </ul>

            {!localStorage.getItem("token") ? (
              <>
                <Button
                  variant="contained"
                  sx={{ mr: 1 }}
                  onClick={() => handleNavigate("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleNavigate("/signup")}
                >
                  Signup
                </Button>
              </>
            ) : (
              <Button variant="contained" onClick={handleLogout}>
                LOGOUT
              </Button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
