import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import LeaveGrid from "../../Components/LeaveManagement/LeaveGrid";
import apiService from "../../Services/apiService";
import { toast } from "react-toastify";

function LeaveGridController() {
  const [leaves, setLeaves] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showUpdateModel, setShowUpdateModel] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [filterFromDate, setFilterFromDate] = useState("");
  const [filterToDate, setFilterToDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("AuthToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const role =
          decoded.role ||
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        setIsAdmin(role === "Admin");
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }

    apiService
      .get("/api/LeaveRequest")
      .then((data) => setLeaves(data))
      .catch((err) => {
        if (err.message.includes("401")) {
          toast.warning("Session expired. Please log in again.");
        } else {
          console.error("Error fetching leave history:", err);
        }
      });
  }, [leaves]);

  const handleApplyClick = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleUpdateClose = () => setShowUpdateModel(false);

  const deleteLeave = async (id) => {
    try {
      await apiService.delete(`/api/LeaveRequest/${id}`);
      toast.success("Leave Deleted Successfully");
      setLeaves((prev) => prev.filter((leave) => leave.id !== id));
    } catch (err) {
      if (err.message.includes("401")) {
        toast.error("Unauthorized. Please log in again.");
      } else {
        console.error("Error deleting leave:", err);
        toast.error("Something went wrong while deleting the leave.");
      }
    }
  };

  const updateLeave = (leave) => {
    setSelectedLeave(leave);
    setShowUpdateModel(true);
  };

  const filteredLeaves = leaves.filter((leave) => {
    const leaveFrom = leave.fromDate?.slice(0, 10);
    const leaveTo = leave.toDate?.slice(0, 10);
    const matchesFrom = filterFromDate ? leaveFrom >= filterFromDate : true;
    const matchesTo = filterToDate ? leaveTo <= filterToDate : true;
    const matchesStatus = filterStatus ? leave.status === filterStatus : true;
    return matchesFrom && matchesTo && matchesStatus;
  });

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Reason", accessor: "reason" },
    { header: "Status", accessor: "status" },
    {
      header: "From",
      accessor: "fromDate",
      render: (row) => new Date(row.fromDate).toLocaleDateString(),
    },
    {
      header: "To",
      accessor: "toDate",
      render: (row) => new Date(row.toDate).toLocaleDateString(),
    },
    {
      header: "Action",
      accessor: "action",
      render: (row) => (
        <>
          <button
            className="btn btn-outline-warning"
            onClick={() => updateLeave(row)}
          >
            Update
          </button>
          {isAdmin && (
            <>
              ||{" "}
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteLeave(row.id)}
              >
                Delete
              </button>
            </>
          )}
        </>
      ),
    },
  ];

  const OnLeavesExport = async () => {
    try {
      await apiService.get(`/api/LeaveRequest/export`);
      toast.success("Leaves Exported Successfully");
    } catch (err) {
      if (err.message.includes("401")) {
        toast.error("Unauthorized. Please log in again.");
      } else {
        console.error("Error deleting leave:", err);
        toast.error("Something went wrong while exporting the leave.");
      }
    }
  };

  return (
    <LeaveGrid
      columns={columns}
      leaves={filteredLeaves}
      isAdmin={isAdmin}
      showModal={showModal}
      showUpdateModel={showUpdateModel}
      selectedLeave={selectedLeave}
      filterFromDate={filterFromDate}
      filterToDate={filterToDate}
      filterStatus={filterStatus}
      setFilterFromDate={setFilterFromDate}
      setFilterToDate={setFilterToDate}
      setFilterStatus={setFilterStatus}
      onApplyClick={handleApplyClick}
      onClose={handleClose}
      onUpdateClose={handleUpdateClose}
      onDelete={deleteLeave}
      onUpdate={updateLeave}
      onExportleaves={OnLeavesExport}
    />
  );
}

export default LeaveGridController;
