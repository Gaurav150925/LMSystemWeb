// src/components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("AuthToken");
  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (err) {
    navigate("/unauthorized");
    return;
  }

  const username =
    decoded.name ||
    decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

  const handleLogout = () => {
    localStorage.removeItem("AuthToken");
    navigate("/login");
  };

  return (
    <header className="header">
      <h2>Leave Management</h2>
      <div className="header-right">
        <span className="username">Welcome, {username}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
