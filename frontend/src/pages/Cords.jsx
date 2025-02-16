import React from "react";
import "./Cords.css"; // Import the CSS file

const Cords = ({ latitude, longitude, altitude, start, message, toggleStart, resetLocation, getLocation }) => {
  return (
    <div className="cords-container">
      <h3 className="cords-title">TESTING API BLOCK</h3>
      <table className="cords-table">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Latitude</td>
            <td>{latitude}</td>
          </tr>
          <tr>
            <td>Longitude</td>
            <td>{longitude}</td>
          </tr>
          <tr>
            <td>Altitude</td>
            <td>{altitude !== null ? altitude : "Not available"}</td>
          </tr>
          <tr>
            <td>Start</td>
            <td className={start ? "true-value" : "false-value"}>
              {start ? "True" : "False"}
            </td>
          </tr>
          <tr>
            <td>Message</td>
            <td>{message}</td>
          </tr>
        </tbody>
      </table>

      <div className="button-container">
        <button onClick={getLocation} className="cords-button">Set Location</button>
        <button onClick={toggleStart} className={`cords-button ${start ? "stop-btn" : "start-btn"}`}>
          {start ? "Stop Mission" : "Start Mission"}
        </button>
        <button onClick={resetLocation} className="cords-button reset-btn">Reset Location</button>
      </div>
    </div>
  );
};

export default Cords;
