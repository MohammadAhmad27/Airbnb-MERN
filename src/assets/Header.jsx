import React from 'react'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import HotelIcon from '@mui/icons-material/Hotel';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LandscapeIcon from '@mui/icons-material/Landscape';
import CastleIcon from '@mui/icons-material/Castle';
import PoolIcon from '@mui/icons-material/Pool';
import ForestIcon from '@mui/icons-material/Forest';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import SailingIcon from '@mui/icons-material/Sailing';




export default function Header() {
  return (
    <>
<div id="filters">
        <div className="filter">
          <LocalFireDepartmentIcon />
          {/* <div><i className="fa-solid fa-fire"></i></div> */}
          <p>Trending</p>
        </div>
        <div className="filter">
          <HotelIcon />
          {/* <div><i className="fa-solid fa-bed"></i></div> */}
          <p>Rooms</p>
        </div>
        <div className="filter">
          <LocationCityIcon />
          {/* <div><i className="fa-solid fa-mountain-city"></i></div> */}
          <p>Iconic Cities</p>
        </div>
        <div className="filter">
          <LandscapeIcon />
          {/* <div><i className="fa-solid fa-mountain"></i></div> */}
          <p>Montains</p>
        </div>
        <div className="filter">
          <CastleIcon />
          {/* <div><i className="fa-solid fa-fort-awesome"></i></div> */}
          <p>Castles</p>
        </div>
        <div className="filter">
          <PoolIcon />
          {/* <div><i className="fa-solid fa-person-swimming"></i></div> */}
          <p>Amazing pools</p>
        </div>
        <div className="filter">
          <ForestIcon />
          {/* <div><i className="fa-solid fa-campground"></i></div> */}
          <p>Camping</p>
        </div>
        <div className="filter">
          <AgricultureIcon />
          {/* <div><i className="fa-solid fa-cow"></i></div> */}
          <p>Farms</p>
        </div>
        <div className="filter">
          <AcUnitIcon />
          {/* <div><i className="fa-solid fa-snowflake"></i></div> */}
          <p>Arctic</p>
        </div>
        <div className="filter">
          <BeachAccessIcon />
          {/* <div><i className="fa-solid fa-igloo"></i></div> */}
          <p>Beaches</p>
        </div>
        <div className="filter">
          < SailingIcon />
          {/* <div><i className="fa-solid fa-sailboat"></i></div> */}
          <p>Lakes</p>
        </div>

        <div className="tax-toggle">
          <div className="form-check-reverse form-switch">
            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
            <label className="form-check-label" for="flexSwitchCheckDefault">Display total after taxes</label>
          </div>
        </div>
      </div>



    </>
  )
}
