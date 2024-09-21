import React from "react";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import HotelIcon from "@mui/icons-material/Hotel";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LandscapeIcon from "@mui/icons-material/Landscape";
import CastleIcon from "@mui/icons-material/Castle";
import PoolIcon from "@mui/icons-material/Pool";
import ForestIcon from "@mui/icons-material/Forest";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import SailingIcon from "@mui/icons-material/Sailing";

export default function Header() {
  return (
    <>
      <header id="filters">
        <div className="filter">
          <LocalFireDepartmentIcon />
          <p>Trending</p>
        </div>
        <div className="filter">
          <HotelIcon />
          <p>Rooms</p>
        </div>
        <div className="filter">
          <LocationCityIcon />
          <p>Iconic Cities</p>
        </div>
        <div className="filter">
          <LandscapeIcon />
          <p>Montains</p>
        </div>
        <div className="filter">
          <CastleIcon />
          <p>Castles</p>
        </div>
        <div className="filter">
          <PoolIcon />
          <p>Amazing pools</p>
        </div>
        <div className="filter">
          <ForestIcon />
          <p>Camping</p>
        </div>
        <div className="filter">
          <AgricultureIcon />
          <p>Farms</p>
        </div>
        <div className="filter">
          <AcUnitIcon />
          <p>Arctic</p>
        </div>
        <div className="filter">
          <BeachAccessIcon />
          <p>Beaches</p>
        </div>
        <div className="filter">
          <SailingIcon />
          <p>Lakes</p>
        </div>
      </header>
    </>
  );
}
