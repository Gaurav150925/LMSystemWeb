import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import bgImage from "../../assets/LMsystembg.png";

function Login({ username, password, setUsername, setPassword, handleSubmit }) {
  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <Link to={"/register"} className="btn btn-link">
          Register New User
        </Link>
      </form>
    </div>
  );
}

export default Login;
