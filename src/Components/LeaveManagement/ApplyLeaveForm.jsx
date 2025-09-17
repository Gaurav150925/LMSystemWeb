import React, { useState } from 'react';

function ApplyLeaveForm({ onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    reason: '',
    fromDate: '',
    toDate: '',
    createdBy: 1 
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const dateRangeError = validateDates(formData.fromDate, formData.toDate);
    if(dateRangeError){
      alert("kindly check the date range"); 
      return; 
    }
    const payload = {
      ...formData,
    };
    const token = localStorage.getItem('AuthToken');
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/LeaveRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to apply leave');

      alert('Leave applied successfully!');
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
 const validateDates = (fromDate, toDate) => {
    if (!fromDate || !toDate) return ''; 
    
    if (fromDate > toDate) return 'From date cannot be after To date.';
    return '';
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Title</label>
        <input type="text" name="title" className="form-control" onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Reason</label>
        <textarea name="reason" className="form-control" onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>From Date</label>
        <input type="date" name="fromDate" className="form-control" onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>To Date</label>
        <input type="date" name="toDate" className="form-control" onChange={handleChange} required />
      </div>
      <button type="submit" className="btn btn-success">Submit</button>
    </form>
  );
}

export default ApplyLeaveForm;
