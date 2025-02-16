import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiDeliveryDrone } from "react-icons/gi";
import { FaClipboardList } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { PiDroneBold } from "react-icons/pi";
import { GiHealthIncrease } from "react-icons/gi";
import { IoMdInformationCircle } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa";
import "./Sidebar.css";

function Sidebar({  getLocation, latitude, longitude, message , start , altitude }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Logo */}
        <div className="logo">
          <PiDroneBold className="drone-icon" />
          <span>DroneDelivery</span>
        </div>

        {/* Menu List */}
        <nav className="lists">
          <Link to="/" className="option">
            <GiDeliveryDrone className="drone" />
            <span>Drone Tracker</span>
          </Link>
          <Link to="/orders" className="option">
            <IoMdInformationCircle className="blue" />
            <span>Information</span>
          </Link>

          <Link to="/order" className="option">
            <FaCartPlus className="icon" />
            <span>Orders Medicin</span>
          </Link>

          <Link to="/health" className="option">
            <GiHealthIncrease className=" red" />
            <span>HEALTH</span>
          </Link>


          
        </nav>

        {/* <div className="location-info">
        <h3 style={{ color: "red" }}>BLOCK FOR TESTING API</h3>

            <h3>Current Location</h3>
            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p>
            <p>Altitude: {altitude !== null ? altitude : "Not available"}</p>
            <p>Start: {start ? "True" : "False"}</p>
            <p>{message}</p>
          </div> */}

        {/* Profile Section */}
        <div className="profile">
          <FaUserCircle className="profile-icon" />
          <span className="text">SAURAV</span>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
