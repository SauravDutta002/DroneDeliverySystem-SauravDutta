import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ title, description, link }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={link} className="btn">
        Select
      </Link>
    </div>
  );
};

export default Card;
