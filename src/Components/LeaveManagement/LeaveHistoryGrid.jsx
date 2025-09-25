import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function LeaveHistoryGrid({
  columns,
  leaves,
  isAdmin,
  filterFromDate,
  setFilterFromDate,
  filterStatus,
  setFilterStatus,
}) {
  return (
    <div className="container mt-4">
      <h2>Leave History</h2>
      <div className="d-flex align-items-center mb-3">
        {isAdmin && (
          <>
            <Link to="/approveleave" className="btn btn-outline-primary m-2">
              Process Leave
            </Link>
            <Link
              to="/leaves"
              className="btn btn-outline-primary m-2"
              style={{ width: "120px" }}
            >
              Leave
            </Link>
          </>
        )}
        <input
          type="date"
          className="form-control btn btn-outline-secondary mx-2"
          style={{ maxWidth: "180px" }}
          value={filterFromDate}
          onChange={(e) => setFilterFromDate(e.target.value)}
        />
        <select
          className="form-control btn btn-outline-secondary mx-2"
          style={{ maxWidth: "180px" }}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
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
            {columns.map((col) => (
              <th key={col.header}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leaves.map((row) => (
            <tr key={row.leaveId}>
              {columns.map((col) => (
                <td key={col.header}>
                  {col.render ? col.render(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default LeaveHistoryGrid;
