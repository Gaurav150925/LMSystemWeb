// src/components/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('AuthToken'); // or sessionStorage
    navigate('/login'); // redirect to login page
  };

  return (
   
<header>
  <h2>Leave Management</h2>
  <button onClick={handleLogout}>Logout</button>
</header>

  );
};


export default Header;
