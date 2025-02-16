import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DroneSelectionPage.css";
import FpvImage from "../assets/FPV.png";
import LargeDrone from "../assets/LargeDrone.jpg";
import QuadcopterImage from "../assets/quadcopter.jpg";

const DroneSelectionPage = () => {
  const { item } = useParams(); // Get selected item from URL
  const navigate = useNavigate(); // Hook for navigation

  const drones = [
    {
      type: "FPV Drone",
      image: FpvImage,
      arrivalTime: "5 mins",
      speed: "150 km/h",
      payload: "500g",
      features: ["High Speed", "HD Camera", "Live Streaming"],
      rating: 4,
      link: `/order/${item}/fpv`,
      icon: "fas fa-drone",
    },
    {
      type: "Quadcopter",
      image: QuadcopterImage,
      arrivalTime: "10 mins",
      speed: "120 km/h",
      payload: "1 kg",
      features: ["Stabilized Flight", "Long Battery Life", "GPS Navigation"],
      rating: 3,
      link: `/order/${item}/quadcopter`,
      icon: "fas fa-plane",
    },
    {
      type: "Large Drone",
      image: LargeDrone,
      arrivalTime: "15 mins",
      speed: "100 km/h",
      payload: "5 kg",
      features: ["Heavy Lift", "Long Endurance", "Custom Payload"],
      rating: 5,
      link: `/order/${item}/large-drone`,
      icon: "fas fa-helicopter",
    },
  ];

  const handleSelectDrone = (drone) => {
    // Store the selected drone information in local storage (or context/state management)
    localStorage.setItem("selectedDrone", JSON.stringify(drone));
    navigate(`/`); // Redirect to home page
  };

  return (
    <div className="drone-selection">
      <h1>Select Drone Type for {item}</h1>
      <div className="drone-options">
        {drones.map((drone, index) => (
          <div className="drone-option-card" key={index}>
            <div className="drone-image-container">
              <img src={drone.image} alt={drone.type} className="drone-image" />
            </div>
            <button className="drone-btn" onClick={() => handleSelectDrone(drone)}>
              <i className={drone.icon}></i> {drone.type}
            </button>
            <div className="drone-details">
              <p>
                <strong>Arrival Time:</strong> {drone.arrivalTime}
              </p>
              <p>
                <strong>Speed:</strong> {drone.speed}
              </p>
              <p>
                <strong>Payload Capacity:</strong> {drone.payload}
              </p>
              <p>
                <strong>Features:</strong> {drone.features.join(", ")}
              </p>
              <div className="drone-rating">
                <p><strong>Rating:</strong></p>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fas fa-star ${i < drone.rating ? "filled" : ""}`}
                    ></i>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DroneSelectionPage;
