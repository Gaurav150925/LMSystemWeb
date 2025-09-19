import React, { useState } from 'react';


function LeaveProcess({onClose,leaveID}) {
    
     const [formData, setFormData] = useState({
        status: '',
        comment: '',
      });
  
    const handleSubmit = async (e) => {
    e.preventDefault();
    
  
    const payload = {
      ...formData,
    };
    const token = localStorage.getItem('AuthToken');
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/LeaveRequest/${leaveID}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),  
      });

      if (!response.ok) throw new Error('Failed to apply leave');

      alert('Leave Processed successfully!');
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

   const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
     <form onSubmit={handleSubmit}>
       <div className="mb-3">
        <label>Status</label>
        <select
          name="status"
          className="form-control"
          value={formData.status}
          onChange={handleChange}
          required
          // If only admins can change, disable for normal users:
          // disabled={!isAdmin}
        >
          <option value="">-- Select Status --</option>
          <option value="Approve">Approved</option>
          <option value="Reject">Rejected</option>
        </select>
      </div>
      <div className="mb-3">
        <label>Comment</label>
        <textarea name="Comment" className="form-control" onChange={handleChange} required />
      </div>
      <button type="submit" className="btn btn-success">Submit</button>
    </form>
  )
}

export default LeaveProcess