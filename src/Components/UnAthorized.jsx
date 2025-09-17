import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function UnAthorized() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f8d7da',
      borderRadius: '8px',
      padding: '40px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ color: '#721c24' }}>Access Denied</h2>
      <p style={{ color: '#721c24', marginBottom: '24px' }}>
        You do not have permission to view this page.<br />
        Please login with an account that has access.
      </p>
      <Button variant="danger" onClick={() => navigate('/login')}>
        Go to Login
      </Button>
      <Button variant="secondary" className="mt-2" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </div>
  );
}

export default UnAthorized;