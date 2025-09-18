import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserRegistrationForm.css';

function UserRegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const { username, password, role } = formData;

  if (!username || !password || !role) {
    setMessage('All fields are required.');
    return;
  }

  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/Register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      alert('Registration failed');
      console.log('Registration failed');
    }

    const result = await response.json();
    setMessage(`User ${username} registered successfully as ${role}.`);
  } catch (error) {
    console.error('Error:', error);
    setMessage('Registration failed. Please try again.');
  }
};


  return (
   <div className="urf-container mt-4">
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
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>
    </div>

    <button type="submit" className="urf-btn-primary">Register</button>
    <Link to="/login" className="urf-btn-link">Login</Link>
  </form>

  {message && <p className="urf-mt-3">{message}</p>}
</div>

  );
}

export default UserRegistrationForm;
