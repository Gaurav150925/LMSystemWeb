import React from "react";
import { LEAVE_STATUS_OPTIONS } from "../../Config/constantconfig";

function UpdateLeaveForm({ formData, handleChange, handleSubmit, isPending }) {
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
          disabled={!isPending}
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
          disabled={!isPending}
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
          disabled={!isPending}
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
          disabled={!isPending}
        />
      </div>

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
          {LEAVE_STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-success" disabled={!isPending}>
        Submit
      </button>
    </form>
  );
}

export default UpdateLeaveForm;
