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
    </div>
  );
};

export default DroneInfo;
