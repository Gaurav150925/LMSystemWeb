import React from "react";

function ApplyLeaveForm({ formData, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Reason</label>
        <textarea
          name="reason"
          className="form-control"
          value={formData.reason}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>From Date</label>
        <input
          type="date"
          name="fromDate"
          className="form-control"
          value={formData.fromDate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>To Date</label>
        <input
          type="date"
          name="toDate"
          className="form-control"
          value={formData.toDate}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-success">
        Submit
      </button>
    </form>
  );
}

export default ApplyLeaveForm;
