import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

function ApproveLeavePage() {
  const [leaves, setLeaves] = useState([]);
  const navigate = useNavigate();

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

    fetch(`${process.env.REACT_APP_BASE_URL}/api/LeaveRequest`, {
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

  const handleApprove = async (id) => {
    const token = localStorage.getItem('AuthToken'); // fixed key

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/LeaveRequest/${id}/approve`, {
        method: 'POST', // use POST for approve endpoint
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ updatedAt: new Date().toISOString() }) // send any required data
      });

      if (!response.ok) throw new Error('Approval failed');

      alert('Leave approved!');
      setLeaves(prev => prev.filter(l => l.id !== id));
    } catch (error) {
      console.error('Error approving leave:', error);
    }
  };

  const handleReject = async (id) => {
    const token = localStorage.getItem('AuthToken'); // fixed key

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/LeaveRequest/${id}/reject`, {
        method: 'POST', 
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ updatedAt: new Date().toISOString() }) // send any required data
      });

      if (!response.ok) throw new Error('Rejection failed');

      alert('Leave Rejected!');
      setLeaves(prev => prev.filter(l => l.id !== id));
    } catch (error) {
      console.error('Error rejecting leave:', error);
    }
  };

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

 

  return (
    <div className="container mt-4">
      <h2>Process Leave Requests</h2>
       <Link to={"/leaves"} className='btn btn-primary m-2'>Leave  
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
                <td>
                  <button className="btn btn-outline-success" onClick={() => handleApprove(leave.id)}>
                    Approve
                  </button>||
                  <button className="btn btn-outline-warning" onClick={() => handleReject(leave.id)}>
                    Reject
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
    </div>
  );
}

export default ApproveLeavePage;
