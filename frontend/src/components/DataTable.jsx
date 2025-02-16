// import React, { useState } from "react";
// import "./DataTable.css";

// function DataTable({ getLocation, latitude, longitude  , toggleStart}) {
//   const [confirmedDrones, setConfirmedDrones] = useState({});

//   // Function to toggle confirmation
//   const handleConfirm = (droneId) => {
//     setConfirmedDrones((prev) => ({
//       ...prev,
//       [droneId]: !prev[droneId], // Toggle confirmation
//     }));
//   };

//   // Drone data
//   const drones = [
//     { id: "DR-001", battery: "75%", lat: latitude ?? "N/A", lon: longitude ?? "N/A" },
//     { id: "DR-002", battery: "40%", lat: latitude ?? "N/A", lon: longitude ?? "N/A"},
//     { id: "DR-003", battery: "55%", lat: latitude ?? "N/A", lon: longitude ?? "N/A" },
//   ];

//   return (
//     <div className="data-table">
//       {/* Data Table */}
//       <div className="table-responsive">
//         <table>
//           <thead>
//             <tr>
//               <th>Drone ID</th>
//               <th>Status</th>
//               <th>Battery</th>
//               <th>Latitude</th>
//               <th>Longitude</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {drones.map((drone) => {
//               const isConfirmed = confirmedDrones[drone.id];
//               return (
//                 <tr key={drone.id}>
//                   <td>{drone.id}</td>
//                   <td>
//                     <span className={`dot ${isConfirmed ? "green-dot" : "red-dot"}`}></span>
//                     {isConfirmed ? "Active" : "Inactive"}
//                   </td>
//                   <td>{drone.battery}</td>
//                   <td>{drone.lat}</td>
//                   <td>{drone.lon}</td>
//                   <td>
//                     <button
//                       onClick={() => {
//                         getLocation();
//                         toggleStart();
//                         handleConfirm(drone.id);
//                       }}
//                       className="confirm-btn"
//                     >
//                       Confirm
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default DataTable;

// import React, { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./DataTable.css";

// function DataTable({ getLocation, latitude, longitude }) {
//   const [confirmedDrones, setConfirmedDrones] = useState({});
//   const [missionStarted, setMissionStarted] = useState(false);

//   // Toggle confirmation for a drone
//   const handleConfirm = (droneId) => {
//     setConfirmedDrones((prev) => ({
//       ...prev,
//       [droneId]: !prev[droneId], // Toggle confirmation
//     }));
//   };

//   // Start/Stop mission
//   const handleStartMission = () => {
//     setMissionStarted((prev) => !prev);
//     if (!missionStarted) {
//       toast.success("🚀 Mission Started!");
//     } else {
//       toast.info("⚡ Mission Stopped!");
//     }
//   };

//   // Drone data
//   const drones = [
//     { id: "DR-001", battery: "75%", lat: latitude ?? "N/A", lon: longitude ?? "N/A" },
//     { id: "DR-002", battery: "40%", lat: latitude ?? "N/A", lon: longitude ?? "N/A" },
//     { id: "DR-003", battery: "55%", lat: latitude ?? "N/A", lon: longitude ?? "N/A" },
//   ];

//   return (
//     <div className="data-table">
//       {/* Toast Notification Container */}
//       <ToastContainer position="top-right" autoClose={3000} />

//       {/* Data Table */}
//       <div className="table-responsive">
//         <table>
//           <thead>
//             <tr>
//               <th>Drone ID</th>
//               <th>Status</th>
//               <th>Battery</th>
//               <th>Latitude</th>
//               <th>Longitude</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {drones.map((drone) => {
//               const isConfirmed = confirmedDrones[drone.id];
//               return (
//                 <tr key={drone.id}>
//                   <td>{drone.id}</td>
//                   <td>
//                     <span className={`dot ${isConfirmed ? "green-dot" : "red-dot"}`}></span>
//                     {isConfirmed ? "Active" : "Inactive"}
//                   </td>
//                   <td>{drone.battery}</td>
//                   <td>{drone.lat}</td>
//                   <td>{drone.lon}</td>
//                   <td>
//                     <button
//                       onClick={() => {
//                         getLocation();
//                         handleConfirm(drone.id);
//                       }}
//                       className="confirm-btn"
//                     >
//                       {isConfirmed ? "Confirmed" : "Confirm"}
//                     </button>

//                     <button
//                       className={`start-btn ${missionStarted ? "mission-started" : ""}`}
//                       onClick={handleStartMission}
//                     >
//                       {missionStarted ? "Mission Started" : "Start Mission"}
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default DataTable;

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./DataTable.css";
import { CiBatteryFull } from "react-icons/ci";
function DataTable({ getLocation, latitude, longitude, toggleStart }) {
  const [confirmedDrones, setConfirmedDrones] = useState({});
  const [missionStarted, setMissionStarted] = useState(false);

  // Toggle confirmation for a drone
  const handleConfirm = (droneId) => {
    setConfirmedDrones((prev) => ({
      ...prev,
      [droneId]: !prev[droneId], // Toggle confirmation
    }));
  };

  // Start/Stop mission
  const handleStartMission = () => {
    setMissionStarted((prev) => !prev);
    if (!missionStarted) {
      toast.success("🚀 Mission Started!");
    } else {
      toast.error("🛑 Mission Stopped!");
    }
  };

  // Drone data
  const drones = [
    {
      id: "DR-001",
      battery: "75%",
      lat: latitude ?? "N/A",
      lon: longitude ?? "N/A",
    },
    {
      id: "DR-002",
      battery: "40%",
      lat: latitude ?? "N/A",
      lon: longitude ?? "N/A",
    },
    {
      id: "DR-003",
      battery: "55%",
      lat: latitude ?? "N/A",
      lon: longitude ?? "N/A",
    },
  ];

  return (
    <div className="data-table">
      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Data Table */}
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Drone ID</th>
              <th>Status</th>
              <th>Battery</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {drones.map((drone) => {
              const isConfirmed = confirmedDrones[drone.id];
              return (
                <tr key={drone.id}>
                  <td>{drone.id}</td>
                  <td>
                    <span
                      className={`dot ${isConfirmed ? "green-dot" : "red-dot"}`}
                    ></span>
                    {isConfirmed ? "Active" : "Inactive"}
                  </td>
                  <td>{drone.battery}</td>
                  <td>{drone.lat}</td>
                  <td>{drone.lon}</td>
                  <td className="new">
                    <button
                      onClick={() => {
                        getLocation();
                        handleConfirm(drone.id);
                      }}
                      className="confirm-btn"
                    >
                      {isConfirmed ? "Confirmed" : "Confirm"}
                    </button>

                    {/* <button
                      className={`start-btn ${missionStarted ?  "mission-stopped" :"mission-started" }`}
                      onClick={handleStartMission} 
                      toggleStart
                      
                    >
                      {missionStarted ?  "Mission Stopped" :"Start Mission" }
                    </button> */}

                    <button
                      className={`start-btn ${
                        missionStarted ? "mission-stopped" : "mission-started"
                      }`}
                      onClick={() => {
                        handleStartMission();
                        toggleStart(); // Calling the prop function
                      }}
                    >
                      {missionStarted ? "STOP Mission" : "Start Mission"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
