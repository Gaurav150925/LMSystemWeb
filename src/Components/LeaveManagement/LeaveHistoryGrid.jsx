import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import ApplyLeaveForm from './ApplyLeaveForm';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import UpdateLeaveForm from './UpdateLeaveForm';
function LeaveHistoryGrid() {
  const [leaves, setLeaves] = useState([]);

   const [isAdmin, setIsAdmin] = useState(false);
 
  const [filterFromDate, setFilterFromDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('');


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

  fetch(`${process.env.REACT_APP_BASE_URL}/api/LeaveRequest/LeaveHistory`, {
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


     
  

     const filteredLeaves = leaves.filter(leave => {
    const leaveFrom = leave.changeDate?.slice(0, 10);
    
    const matchesFrom = filterFromDate ? leaveFrom == filterFromDate : true;
    const matchesStatus = filterStatus ? leave.status === filterStatus : true;
   
    return matchesFrom && matchesStatus;
  });

  return (
    <div className="container mt-4">
      <h2>Leave Requests</h2>
      <div className="d-flex align-items-center mb-3">
         {isAdmin && (
                  <>
                  <Link to="/approveleave" className="btn btn-primary m-2">
                    Process Leave
                  </Link>
                    <Link to="/leaves" className="btn btn-primary m-2">
                    Leave
                  </Link>
                  </>
                )}
        <input
        type="date"
        className="form-control mx-2"
        style={{ maxWidth: '180px' }}
        value={filterFromDate}
        onChange={e => setFilterFromDate(e.target.value)}
        placeholder="From Date"
      />
    
        <select
          className="form-control"
          style={{ maxWidth: '180px' }}
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Deleted">Deleted</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>LeaveId</th>
            <th>Status</th>
            <th>ChangeBY</th>
            <th>ChangedAT</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeaves.map(leave => (
            <tr key={leave.leaveId}>
                <td>{leave.leaveId}</td>
              <td>{leave.status}</td>
              <td>{leave.changedBy}</td>
             <td>{new Date(leave.changeDate).toLocaleDateString()}</td>
              <td>{leave.comment}</td>
            </tr>
          ))}
        </tbody>
      </Table>

    
    </div>
  );
}

export default LeaveHistoryGrid;
