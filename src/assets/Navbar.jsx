import React from 'react'
import Button from '@mui/material/Button';
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    props.showAlert("Logged out Successfully!", "success");
    navigate("/login");
  }
  let location = useLocation();
  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><img src="brand.png" alt="navbar-brand" style={{ width: '85px' }} /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/addnewlisting" ? "active" : ""}`} aria-current="page" to="/addnewlisting">Add New Listing</Link>
              </li>
            </ul>

            {!localStorage.getItem('token') ? <>
              <Link to="/login"><Button variant="contained" sx={{ mr: 1 }}>Login</Button></Link>
              <Link to="/signup"><Button variant="contained" >Signup</Button></Link>
            </> : <Link to="/logout" onClick={handleLogout}><Button variant="contained" >LOGOUT</Button></Link>}

          </div>
        </div>
      </nav>
    </>
  )
}
