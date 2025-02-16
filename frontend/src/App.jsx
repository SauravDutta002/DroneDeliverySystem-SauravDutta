

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MapView from "./components/MapView";
import DataTable from "./components/DataTable";
import Dashboard from "./pages/Dashboard";
import OrderPage from "./pages/OrderPage"
import Health from "./pages/Health"
import DroneSelectionPage from "./pages/DroneSelectionPage";
import Cords from "./pages/Cords";
import Footer from "./components/Footer";
import "./App.css";


function App() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    altitude: null,
    start: false,
  });
  const [message, setMessage] = useState("");

  // Fetch location from backend (GET request)
  const fetchLocation = async () => {
    try {
      const response = await fetch("https://dronedeliverysystem02.onrender.com/api/set-location");
      const data = await response.json();

      if (response.ok) {
        setLocation((prevLocation) => ({
          ...prevLocation, 
          latitude: data.latitude ?? prevLocation.latitude,
          longitude: data.longitude ?? prevLocation.longitude,
          altitude: data.altitude ?? prevLocation.altitude,
          start: data.start ?? prevLocation.start, 
        }));
        setMessage("Fetched location data from server.");
      } else {
        setMessage("Error fetching location data.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      setMessage("Error fetching location from server.");
    }
  };

  // Get live location and send to backend (POST request)
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const altitude = position.coords.altitude || null;

          setLocation((prevLocation) => ({
            ...prevLocation,
            latitude,
            longitude,
            altitude,
          }));

          try {
            const response = await fetch("https://dronedeliverysystem02.onrender.com/api/set-location", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                latitude,
                longitude,
                altitude,
                start: location.start, 
              }),
            });

            const data = await response.json();
            if (response.ok) {
              setMessage("Live location sent successfully!");
              setLocation((prevLocation) => ({
                ...prevLocation,
                ...data.location,
              }));
            } else {
              setMessage("Failed to update location.");
            }
          } catch (error) {
            console.error("Error updating location:", error);
            setMessage("Error sending location data.");
          }
        },
        (error) => {
          setMessage("Error fetching live location.");
          console.error("Geolocation error:", error);
        }
      );
    } else {
      setMessage("Geolocation is not supported by this browser.");
    }
  };

  
  const [isAnimating, setIsAnimating] = useState(false);

  const animateDrone = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Add your drone animation logic here
    setTimeout(() => {
      setIsAnimating(false);
    }, 5000); // Example: Animation lasts 5 seconds
  };




  // Toggle 'start' value while keeping lat, long, and altitude unchanged
  const toggleStart = () => {
    const newStartValue = !location.start;

    setLocation((prevLocation) => ({
      ...prevLocation,
      start: newStartValue, 
    }));

    fetch("https://dronedeliverysystem02.onrender.com/api/set-location", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        latitude: location.latitude,
        longitude: location.longitude,
        altitude: location.altitude,
        start: newStartValue,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        setLocation((prevLocation) => ({
          ...prevLocation,
          start: newStartValue, 
        }));
      })
      .catch((error) => {
        setMessage("Error updating start value.");
        console.error("Error:", error);
      });
  };

  // Reset all values to null and update backend
  const resetLocation = () => {
    fetch("https://dronedeliverysystem02.onrender.com/api/set-location", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        latitude: null,
        longitude: null,
        altitude: null,
        start: false, 
      }),
    })
      .then((response) => response.json())
      .then(() => {
        setMessage("Location reset successfully.");
        setLocation({ latitude: null, longitude: null, altitude: null, start: false });
      })
      .catch((error) => {
        setMessage("Error resetting location.");
        console.error("Error:", error);
      });
  };

  // Fetch location on first load
  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <Router>
      <div className="dashboard">
        <Sidebar getLocation={getLocation} latitude={location.latitude} longitude={location.longitude} altitude = {location.altitude} message={message} start = {location.start} toggleStart={toggleStart} resetLocation={resetLocation}/>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard getLocation={getLocation} latitude={location.latitude} longitude={location.longitude} toggleStart = {toggleStart} animateDrone={animateDrone}/>} />
            <Route path="/map" element={<MapView getLocation={getLocation} latitude={location.latitude} longitude={location.longitude} animateDrone={animateDrone} />} />
            <Route path="/data" element={<DataTable getLocation={getLocation} latitude={location.latitude} longitude={location.longitude} toggleStart={toggleStart}/>} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/orders" element={<Cords getLocation={getLocation} latitude={location.latitude} longitude={location.longitude} altitude = {location.altitude} message={message} start = {location.start} toggleStart={toggleStart} resetLocation={resetLocation} />} />
            <Route path="/order/:item" element={<DroneSelectionPage />} />
            <Route path="/health" element={<Health getLocation={getLocation} latitude={location.latitude} longitude={location.longitude} altitude = {location.altitude} message={message} start = {location.start} toggleStart={toggleStart} resetLocation={resetLocation} />} />

          </Routes>

          {/* Single Button for Sending & Fetching Location */}

          {/* BUTTONS FOR TESTING API */}

          {/* <button onClick={getLocation} className="location-btn">
            Send Location
          </button>

          <button onClick={toggleStart} className="toggle-start-btn">
            {location.start ? "Stop" : "Start"}
          </button>
        
          <button onClick={resetLocation} className="reset-btn">
            Reset Location
          </button> */}

          
        <Footer/>
        </main>

      </div>

    </Router>


  );
}

export default App;
