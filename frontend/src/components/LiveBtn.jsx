import React from "react";
import "./LiveBtn.css"
const LiveBtn = (getLocation) => {
  return (
    <button onClick={getLocation}>
      <FaLocationArrow style={{ fontSize: "24px", marginRight: "5px" }} />
    </button>
  );
};

export default LiveBtn;
