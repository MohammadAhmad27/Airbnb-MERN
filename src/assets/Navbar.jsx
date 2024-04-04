import React from 'react'
import Button from '@mui/material/Button';
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  let location = useLocation();
  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><img src="brand.png" alt="navbar-brand" style={{width: '85px'}} /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/addnewlisting" ? "active" : ""}`} aria-current="page" to="/addnewlisting">Add new Listing</Link>
              </li>
            </ul>
            <Button variant="contained" sx={{mr:1}}>
              Login
            </Button>
            <Button variant="contained">
              Signup
            </Button>
          </div>
        </div>
      </nav>
    </>
  )
}
