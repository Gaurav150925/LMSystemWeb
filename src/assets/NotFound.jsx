import React from "react";
import Notfound from "../assets/Notfound.jpg";
import "./NotFound.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div
        className="notfound-container"
        style={{
          backgroundImage: `url(${Notfound})`,
          height: "90VH",
          backgroundSize: "cover",
        }}
      ></div>
      <Link className="btn-notfound btn btn-outline-secondary" to="/">
        Go to Home
      </Link>
    </>
  );
}

export default NotFound;
