import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./UserRegistrationForm.css";
import { ROLE_OPTIONS } from "../../Config/constantconfig";
import bgImage from "../../assets/LMsystembg.png";

function UserRegistrationForm({
  formData,
  handleChange,
  handleSubmit,
  message,
}) {
  return (
    <div className="user-container" style={{ backgroundImage: `url(${bgImage})` }}>
    <div className="urf-container mt-4" >
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="urf-mb-3">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            className="urf-form-control"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="urf-mb-3">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            className="urf-form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="urf-mb-3">
          <label>Role:</label>

          <select
            name="role"
            className="urf-form-control"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            {ROLE_OPTIONS.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="urf-btn-primary">
          Register
        </button>
        <Link to="/login" className="urf-btn-link">
          Login
        </Link>
      </form>

      {message && <p className="urf-mt-3">{message}</p>}
    </div>
    </div>
  );
}

export default UserRegistrationForm;
