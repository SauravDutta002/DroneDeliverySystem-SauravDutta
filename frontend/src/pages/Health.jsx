import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MapView from "../components/MapView";
import { MdAddAlert } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import "./Health.css";

const Health = ({ resetLocation }) => {
  const [isHealthAlert, setIsHealthAlert] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [loading, setLoading] = useState(false);

  // Show success notification
  const notify = () => {
    toast.success("🚁 Emergency Alert Sent!", {
      position: "top-center",
      autoClose: 4000,
      theme: "dark",
    });
  };

  // Get user's current location
  const getLocation = () => {
    if (!navigator.geolocation) {
      return toast.error("❌ Geolocation is not supported.");
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        toast.error("⚠️ Location error: " + error.message);
      }
    );
  };

  // Toggle health alert
  const handleHealthAlertClick = () => {
    if (!isHealthAlert) {
      setIsHealthAlert(true);
      notify();
    } else {
      setIsHealthAlert(false);
      resetLocation();
    }
  };

  return (
    <div className="health-page">
        <h1 className="title">EMERGENCY DRONE</h1>

      {/* Map at the top */}
      <MapView latitude={location.latitude} longitude={location.longitude} />

      {/* Vibrating Emergency Icon Button (Toggles between MdAddAlert & ImCancelCircle) */}
      <button className={`alert-button ${isHealthAlert ? "cancel" : ""}`} onClick={handleHealthAlertClick}>
        {isHealthAlert ? <ImCancelCircle size={100} color="#ff4444" /> : <MdAddAlert size={100} color="#ff4444" />}
      </button>

      <ToastContainer />

      {/* Location details and buttons at the bottom */}
      <div className="content">

        {/* Latitude and Longitude Display */}
        <div className="coordinates">
          {location.latitude && location.longitude ? (
            <>
              <p>📍 Latitude: {location.latitude}</p>
              <p>📍 Longitude: {location.longitude}</p>
            </>
          ) : (
            <p className="no-location">⚠️ Location not available</p>
          )}
        </div>

        {/* Buttons Container */}
        <div className="button-group">
          {/* Get Location Button */}
          <button className="get-location-btn" onClick={getLocation} disabled={loading}>
            {loading ? "Fetching Location..." : "📍 My Location"}
          </button>
          

          {/* Health Alert Button */}
          <button
            className={`health-btn ${isHealthAlert ? "cancel" : ""}`}
            onClick={handleHealthAlertClick}
          >
            {isHealthAlert ? "❌ Cancel Alert" : "🚨 Emergency Alert"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Health;
