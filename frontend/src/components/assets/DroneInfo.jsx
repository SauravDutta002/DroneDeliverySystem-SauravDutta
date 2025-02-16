import React, { useEffect, useState } from "react";

const DroneInfo = () => {
  const [selectedDrone, setSelectedDrone] = useState(null);

  useEffect(() => {
    // Retrieve the selected drone info from localStorage
    const drone = JSON.parse(localStorage.getItem("selectedDrone"));
    setSelectedDrone(drone);
  }, []);

  if (!selectedDrone) return <div>Loading...</div>;

  return (
    <div className="drone-info">
      <h1>{selectedDrone.type} Details</h1>
      <img src={selectedDrone.image} alt={selectedDrone.type} />
      <p><strong>Arrival Time:</strong> {selectedDrone.arrivalTime}</p>
      <p><strong>Speed:</strong> {selectedDrone.speed}</p>
      <p><strong>Payload Capacity:</strong> {selectedDrone.payload}</p>
      <p><strong>Features:</strong> {selectedDrone.features.join(", ")}</p>
      <div className="drone-rating">
        <strong>Rating:</strong>
        <div className="stars">
          {[...Array(5)].map((_, i) => (
            <i
              key={i}
              className={`fas fa-star ${i < selectedDrone.rating ? "filled" : ""}`}
            ></i>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DroneInfo;
