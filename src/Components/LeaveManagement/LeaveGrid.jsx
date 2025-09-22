import React from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import UpdateLeaveController from "../../Controllers/LeavesController/UpdateLeaveController";
import ApplyLeaveController from "../../Controllers/LeavesController/ApplyLeaveController";

function LeaveGrid({
  columns,
  leaves,
  isAdmin,
  showModal,
  showUpdateModel,
  selectedLeave,
  filterFromDate,
  filterToDate,
  filterStatus,
  setFilterFromDate,
  setFilterToDate,
  setFilterStatus,
  onApplyClick,
  onClose,
  onUpdateClose,
}) {
  return (
    <div className="container mt-4">
      <h2>Leave Requests</h2>
      <div className="d-flex align-items-center mb-3">
        <Button variant="btn btn-outline-primary" onClick={onApplyClick}>
          Apply Leave
        </Button>
        {isAdmin && (
          <>
            <Link to="/approveleave" className="btn btn-outline-primary m-2">
              Process Leave
            </Link>
            <Link to="/leaveshistory" className="btn btn-outline-primary m-2">
              Leave History
            </Link>
          </>
        )}
        <input
          type="date"
          className="form-control mx-2"
          style={{ maxWidth: "180px" }}
          value={filterFromDate}
          onChange={(e) => setFilterFromDate(e.target.value)}
        />
        <input
          type="date"
          className="form-control mx-2"
          style={{ maxWidth: "180px" }}
          value={filterToDate}
          onChange={(e) => setFilterToDate(e.target.value)}
        />
        <select
          className="form-control"
          style={{ maxWidth: "180px" }}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <Table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.header}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leaves.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.header}>
                  {col.render ? col.render(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Apply for Leave</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ApplyLeaveController onClose={onClose} />
        </Modal.Body>
      </Modal>

      <Modal show={showUpdateModel} onHide={onUpdateClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Leave</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateLeaveController onClose={onUpdateClose} leave={selectedLeave} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default LeaveGrid;
