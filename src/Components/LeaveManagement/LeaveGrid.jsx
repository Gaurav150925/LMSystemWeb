import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import ApplyLeaveForm from './ApplyLeaveForm';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import UpdateLeaveForm from './UpdateLeaveForm';
function LeaveGrid() {
  const [leaves, setLeaves] = useState([]);
  const [showModal, setShowModal] = useState(false);
   const [isAdmin, setIsAdmin] = useState(false);
   const [showUpdateModel,setShowUpdateModel]=useState(false);
   const [selectedLeave,setSelectedLeave]=useState(null);
  const [filterFromDate, setFilterFromDate] = useState('');
  const [filterToDate, setFilterToDate] = useState('');
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
  
     
  const deleteLeave=(id)=>{
    debugger
    const delresponse= fetch(`${process.env.REACT_APP_BASE_URL}/api/LeaveRequest/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
      }});
      if (!delresponse.ok) {
        console.log("Something went wrong");  
      }
      else{
        alert("Leave Deleted Successfully");
      }
  }

  const updateLeave=(id)=>
    {
      setSelectedLeave(id);
      setShowUpdateModel(true);

    }

      const handleUpdateClose = () => {
    setShowUpdateModel(false);
  };

    const filteredLeaves = leaves.filter(leave => {
    const leaveFrom = leave.fromDate?.slice(0, 10);
    const leaveTo = leave.toDate?.slice(0, 10);

    const matchesFrom = filterFromDate ? leaveFrom >= filterFromDate : true;
    const matchesTo = filterToDate ? leaveTo <= filterToDate : true;
    const matchesStatus = filterStatus ? leave.status === filterStatus : true;

    return matchesFrom && matchesTo && matchesStatus;
  });

  return (
    <div className="container mt-4">
      <h2>Leave Requests</h2>
      <div className="d-flex align-items-center mb-3">
        <Button variant="primary" onClick={handleApplyClick}>
          Apply Leave
        </Button>
        {isAdmin && (
          <>
          <Link to="/approveleave" className="btn btn-primary m-2">
            Process Leave
          </Link>
            <Link to="/leaveshistory" className="btn btn-primary m-2">
            Leave History
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
      <input
        type="date"
        className="form-control mx-2"
        style={{ maxWidth: '180px' }}
        value={filterToDate}
        onChange={e => setFilterToDate(e.target.value)}
        placeholder="To Date"
      />
        <select
          className="form-control"
          style={{ maxWidth: '180px' }}
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Reason</th>
            <th>Status</th>
            <th>From</th>
            <th>To</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeaves.map(leave => (
            <tr key={leave.id}>
              <td>{leave.title}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
              <td>{new Date(leave.fromDate).toLocaleDateString()}</td>
              <td>{new Date(leave.toDate).toLocaleDateString()}</td>
              <td>
                <button className='btn btn-outline-warning' onClick={() => updateLeave(leave)}>Update</button>
             
                {isAdmin && (
                    <>
                      {" || "}
                      <button className='btn btn-outline-danger' onClick={() => deleteLeave(leave.id)}>Delete</button>
                    </>
                  )}
                </td>
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
         <Modal show={showUpdateModel} onHide={handleUpdateClose}>
        <Modal.Header closeButton>
          <Modal.Title>Apply for Leave</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateLeaveForm onClose={handleUpdateClose} leave={selectedLeave} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default LeaveGrid;
