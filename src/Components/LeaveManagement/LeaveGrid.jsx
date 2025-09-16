import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import ApplyLeaveForm from './ApplyLeaveForm';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
function LeaveGrid() {
  const [leaves, setLeaves] = useState([]);
  const [showModal, setShowModal] = useState(false);
   const [isAdmin, setIsAdmin] = useState(false);

useEffect(() => {
  const token = localStorage.getItem('AuthToken'); // Get token from localStorage or context

if (token) {
      try {
        const decoded = jwtDecode(token);
        const role = decoded.role || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        // Assuming the role is stored as 'role' in the token payload
        setIsAdmin(role === 'Admin');
      } catch (err) {
        console.error('Invalid token:', err);
      }
    }

  fetch(`${process.env.REACT_APP_BASE_URL}/api/LeaveRequest`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Unauthorized or failed to fetch');
      }
      return res.json();
    })
    .then(data => setLeaves(data))
    .catch(err => console.error('Error fetching leaves:', err));
}, [leaves]);


  const handleApplyClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  
     

  return (
    <div className="container mt-4">
      <h2>Leave Requests</h2>
         <Button variant="primary" onClick={handleApplyClick}>
        Apply Leave
      </Button>

     
    {isAdmin && (
            <Link to="/approveleave" className="btn btn-primary m-2">
            Approve Leave
            </Link>
        )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Reason</th>
            <th>Status</th>
            <th>From</th>
            <th>To</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map(leave => (
            <tr key={leave.id}>
              <td>{leave.title}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
              <td>{new Date(leave.fromDate).toLocaleDateString()}</td>
              <td>{new Date(leave.toDate).toLocaleDateString()}</td>
              <td>{leave.createdBy}</td>
            </tr>
          ))}
        </tbody>
      </Table>

     

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Apply for Leave</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ApplyLeaveForm onClose={handleClose} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default LeaveGrid;
