import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import droneImg from "../assets/LOGO.png";
import { GoStack } from "react-icons/go";
import { MdSatelliteAlt } from "react-icons/md";
import { CgDarkMode } from "react-icons/cg";
import { CiLight } from "react-icons/ci";
import { FaLocationArrow } from "react-icons/fa";

// Custom component to smoothly move the map to the user's location
function MapViewUpdater({ latitude, longitude }) {
  const map = useMap();

  useEffect(() => {
    if (latitude && longitude) {
      map.flyTo([latitude, longitude], 15, { animate: true, duration: 1.5 });
    }
  }, [latitude, longitude, map]);

  return null;
}

// Custom Drone Icon
const droneIcon = new L.Icon({
  iconUrl: droneImg,
  iconSize: [60, 60],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Custom User Location Marker
const userIcon = L.divIcon({
  className: "animated-user-marker",
  html: `<div class="location-pulse"></div>`,
  iconSize: [35, 35],
  iconAnchor: [10, 10],
});

function MapView({ latitude, longitude, getLocation }) {
  const initialDroneLocation = { lat: 30.7694, lng: 76.5768 }; // Original drone position
  const [dronePosition, setDronePosition] = useState(initialDroneLocation);
  const [liveLocation, setLiveLocation] = useState({
    lat: latitude,
    lng: longitude,
  });
  const [isAnimating, setIsAnimating] = useState(false);

  // Polyline path between user's live location and drone
  const pathCoordinates = [
    [dronePosition.lat, dronePosition.lng],
    [liveLocation.lat || 0, liveLocation.lng || 0],
  ];

  const mapThemes = {
    default: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    satellite:
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  };

  const [currentTheme, setCurrentTheme] = useState(mapThemes.default);

  const getLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLiveLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Function to animate the drone
  const animateDrone = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const steps = 100; // Number of steps for smooth movement
    let stepCount = 0;

    const latDiff = (liveLocation.lat - initialDroneLocation.lat) / steps;
    const lngDiff = (liveLocation.lng - initialDroneLocation.lng) / steps;

    const moveDrone = (direction = 1) => {
      if (stepCount >= steps) {
        if (direction === 1) {
          stepCount = 0;
          setTimeout(() => moveDrone(-1), 1000); // Wait and return
        } else {
          setIsAnimating(false);
        }
        return;
      }

      setDronePosition((prev) => ({
        lat: prev.lat + direction * latDiff,
        lng: prev.lng + direction * lngDiff,
      }));

      stepCount++;
      setTimeout(() => moveDrone(direction), 150);
    };

    moveDrone(1);
  };

  return (
    <div className="mapcontainer">
      <MapContainer
        center={[latitude || 28.7041, longitude || 77.1025]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url={currentTheme} />

        {/* User Location Marker */}
        {liveLocation.lat && liveLocation.lng && (
          <>
            <Marker
              position={[liveLocation.lat, liveLocation.lng]}
              icon={userIcon}
            >
              <Popup>Your Location</Popup>
            </Marker>
            <MapViewUpdater
              latitude={liveLocation.lat}
              longitude={liveLocation.lng}
            />
          </>
        )}

        {/* Drone Marker */}
        <Marker
          position={[dronePosition.lat, dronePosition.lng]}
          icon={droneIcon}
        >
          <Popup>Drone Location</Popup>
        </Marker>

        {/* Path Line */}
        {liveLocation.lat && liveLocation.lng && (
          <Polyline
            positions={pathCoordinates}
            color="green"
            weight={3}
            opacity={0.8}
            dashArray="5,10"
          />
        )}
      </MapContainer>

      {/* Theme Buttons */}
      <div className="MapThemeButtons">
        <button onClick={() => setCurrentTheme(mapThemes.default)}>
          <GoStack />
        </button>
        <button onClick={() => setCurrentTheme(mapThemes.dark)}>
          <CgDarkMode />
        </button>
        <button onClick={() => setCurrentTheme(mapThemes.satellite)}>
          <MdSatelliteAlt />
        </button>
        <button onClick={() => setCurrentTheme(mapThemes.light)}>
          <CiLight />
        </button>
      </div>

      {/* Live Location & Animate Drone Button */}
      <div className="LiveLocationButton">
        <button
          onClick={() => {
            getLiveLocation();
            getLocation();
          }}
        >
          <FaLocationArrow style={{ fontSize: "24px", marginRight: "5px" }} />
        </button>



          {/* BUTTON FOR DRONE ANIMATION */}

        {/* <button
          onClick={animateDrone}
          disabled={isAnimating}
          style={{ marginLeft: "10px" }}
        >
          START DRONE 
        </button> */}


      </div>
    </div>
  );
}

export default MapView;
