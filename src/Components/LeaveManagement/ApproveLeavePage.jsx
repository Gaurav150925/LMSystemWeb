import React from "react";
import { Link } from "react-router-dom";
import { Table, Modal } from "react-bootstrap";
import LeaveProcessController from "../../Controllers/LeavesController/LeaveProcessController";

function ApproveLeaveGrid({
  columns,
  leaves,
  showLeaveprocessModel,
  leaveID,
  onLeaveProcessClose,
}) {
  return (
    <div className="container mt-4">
      <h2>Process Leave Requests</h2>
      <Link to="/leaves" className="btn btn-outline-primary m-2">
        Leave
      </Link>
      <Link to="/leaveshistory" className="btn btn-outline-primary m-2">
        Leave History
      </Link>
      {leaves.length === 0 ? (
        <p>No pending leave requests.</p>
      ) : (
        <Table bordered>
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
      )}
      <Modal show={showLeaveprocessModel} onHide={onLeaveProcessClose}>
        <Modal.Header closeButton>
          <Modal.Title>Process Leaves</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LeaveProcessController onClose={onLeaveProcessClose} leaveID={leaveID} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ApproveLeaveGrid;
