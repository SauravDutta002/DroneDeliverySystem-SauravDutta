import React from "react";
import MapView from "../components/MapView";
import DataTable from "../components/DataTable";

const Dashboard = ({getLocation , latitude , longitude , toggleStart ,animateDrone}) => {
  return (
    <div>
      <div className="dashboard">
        <main className="main-content">
          <MapView getLocation={getLocation}  latitude={latitude} longitude={longitude}  />
          <DataTable getLocation={getLocation}  latitude={latitude} longitude={longitude} toggleStart={toggleStart}/>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;