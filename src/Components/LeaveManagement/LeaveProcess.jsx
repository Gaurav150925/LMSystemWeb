import React from "react";

function LeaveProcessForm({ formData, handleChange, handleSubmit }) {
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
        >
          <option value="">-- Select Status --</option>
          <option value="Approve">Approved</option>
          <option value="Reject">Rejected</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Comment</label>
        <textarea
          name="comment"
          className="form-control"
          value={formData.comment}
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

export default LeaveProcessForm;
