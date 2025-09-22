import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import LeaveHistoryGrid from "./../../Components/LeaveManagement/LeaveHistoryGrid";
import apiService from "../../Services/apiService";
import { toast } from "react-toastify";

function LeaveHistoryController() {
  const [leaves, setLeaves] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [filterFromDate, setFilterFromDate] = useState("");
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
        toast.error("Invalid token:");
      }
    }

    apiService
      .get("/api/LeaveRequest/LeaveHistory")
      .then((data) => setLeaves(data))
      .catch((err) => {
        if (err.message.includes("401")) {
          toast.error("Session expired. Please log in again.");
        } else {
          toast.error("Error fetching leave history:");
        }
      });
  }, []);

  const filteredLeaves = leaves.filter((leave) => {
    const leaveFrom = leave.changeDate?.slice(0, 10);
    const matchesFrom = filterFromDate ? leaveFrom === filterFromDate : true;
    const matchesStatus = filterStatus ? leave.status === filterStatus : true;
    return matchesFrom && matchesStatus;
  });

  const columns = [
    { header: "Leave ID", accessor: "leaveId" },
    { header: "Status", accessor: "status" },
    { header: "Changed By", accessor: "changedBy" },
    {
      header: "Changed At",
      accessor: "changeDate",
      render: (row) => new Date(row.changeDate).toLocaleDateString(),
    },
    { header: "Comments", accessor: "comment" },
  ];

  return (
    <LeaveHistoryGrid
      columns={columns}
      leaves={filteredLeaves}
      isAdmin={isAdmin}
      filterFromDate={filterFromDate}
      setFilterFromDate={setFilterFromDate}
      filterStatus={filterStatus}
      setFilterStatus={setFilterStatus}
    />
  );
}

export default LeaveHistoryController;
