import React, { use, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { Table, Button, Modal } from 'react-bootstrap';
import LeaveProcess from './LeaveProcess';

function ApproveLeavePage() {
  const [leaves, setLeaves] = useState([]);
  const [leaveID,setLeaveID]=useState(0);
  const navigate = useNavigate();
   const [showLeaveprocessModel,setShowLeaveprocessModel]=useState(false);
  useEffect(() => {
    const token = localStorage.getItem('AuthToken');
    if (!token) {
      navigate('/unauthorized');
      return;
    }

    let decoded;
    try {
      decoded = jwtDecode(token);
    } catch (err) {
      console.error('Invalid token:', err);
      navigate('/unauthorized');
      return;
    }

    const role = decoded.role || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    if (role !== 'Admin') {
      navigate('/unauthorized');
      return;
    }

    fetch(`${process.env.REACT_APP_BASE_URL}/api/LeaveRequest/PendingLeaves`, {
      method: 'POST',  
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        const pendingLeaves = data.filter(l => l.status === 'Pending');
        setLeaves(pendingLeaves);
      })
      .catch(err => console.error('Error fetching leaves:', err));
  }, [navigate]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('AuthToken'); // fixed key

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/LeaveRequest/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Deletion failed');

      alert('Leave deleted!');
      setLeaves(prev => prev.filter(l => l.id !== id));
    } catch (error) {
      console.error('Error deleting leave:', error);
    }
  };

 
 const handleleaveprocessClose = (id) => {
   
    setShowLeaveprocessModel(false);
  };

   const ProcessLeave=(id)=>
    {
       setLeaveID(id)
      setShowLeaveprocessModel(true);

    }

  return (
    <div className="container mt-4">
      <h2>Process Leave Requests</h2>
       <Link to={"/leaves"} className='btn btn-primary m-2'>Leave  
      </Link>
       <Link to={"/leaveshistory"} className='btn btn-primary m-2'>leaveshistory  
      </Link>
      {leaves.length === 0 ? (
        <p>No pending leave requests.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Reason</th>
              <th>From</th>
              <th>To</th>
              <th>Userid</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map(leave => (
              <tr key={leave.id}>
                <td>{leave.title}</td>
                <td>{leave.reason}</td>
                <td>{new Date(leave.fromDate).toLocaleDateString()}</td>
                <td>{new Date(leave.toDate).toLocaleDateString()}</td>
                <td>{leave.createdBy}</td>
                <td>
                  <button className="btn btn-outline-success" onClick={() => ProcessLeave(leave.id)}>
                    Process Request
                  </button>||
                    <button className="btn btn-outline-danger" onClick={() => handleDelete(leave.id)}>
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
         <Modal show={showLeaveprocessModel} onHide={handleleaveprocessClose}>
        <Modal.Header closeButton>
          <Modal.Title>Process Leaves</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LeaveProcess onClose={handleleaveprocessClose} leaveID={leaveID} />
        </Modal.Body>
      </Modal>
      
    </div>
    
  );
}

export default ApproveLeavePage;
