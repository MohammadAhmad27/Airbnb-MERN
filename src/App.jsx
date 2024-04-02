import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from './assets/Navbar'
import Footer from './assets/Footer'
import Home from './assets/Home'
import AddNewListing from './assets/AddNewListing'
import Header from './assets/Header'

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Header/>
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
