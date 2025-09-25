import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ApproveLeaveGrid from "../../Components/LeaveManagement/ApproveLeavePage";
import apiService from "../../Services/apiService";
import { toast } from "react-toastify";

function ApproveLeaveController() {
  const [leaves, setLeaves] = useState([]);
  const [leaveID, setLeaveID] = useState(0);
  const [showLeaveprocessModel, setShowLeaveprocessModel] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("AuthToken");
    if (!token) {
      toast.error("No token found. Please log in.");
      navigate("/unauthorized");
      return;
    }

    let decoded;
    try {
      decoded = jwtDecode(token);
    } catch (err) {
      toast.error("Invalid token:");
      navigate("/unauthorized");
      return;
    }

    const role =
      decoded.role ||
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    if (role !== "Admin") {
      toast.error("Unauthorized access. Admins only.");
      navigate("/unauthorized");
      return;
    }

    apiService
      .post("/api/LeaveRequest/PendingLeaves")
      .then((data) => {
        const pendingLeaves = data?.filter((l) => l.status === "Pending");
        setLeaves(pendingLeaves);
      })
      .catch((err) => {
        if (err.message.includes("401")) {
          toast.error("Session expired. Please log in again.");
          navigate("/unauthorized");
        } else {
          toast.error("Error fetching pending leaves:");
        }
      });
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      await apiService.delete(`/api/LeaveRequest/${id}`);
      toast.success("Leave deleted!");
      setLeaves((prev) => prev.filter((l) => l.id !== id));
    } catch (error) {
      if (error.message.includes("401")) {
        toast.error("Unauthorized. Please log in again.");
        // Optionally redirect to login
        // navigate('/unauthorized');
      } else {
        console.error("Error deleting leave:", error);
        toast.error("Something went wrong while deleting the leave.");
      }
    }
  };

  const handleLeaveProcessClose = () => setShowLeaveprocessModel(false);

  const processLeave = (id) => {
    setLeaveID(id);
    setShowLeaveprocessModel(true);
  };

  // Define columns for dynamic table
  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Reason", accessor: "reason" },
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
    { header: "Userid", accessor: "createdBy" },
    {
      header: "Action",
      accessor: "action",
      render: (row) => (
        <>
          <button
            className="btn btn-outline-success"
            onClick={() => processLeave(row.id)}
          >
            Process Request
          </button>
          {" || "}
          <button
            className="btn btn-outline-danger"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <ApproveLeaveGrid
      columns={columns}
      leaves={leaves}
      showLeaveprocessModel={showLeaveprocessModel}
      leaveID={leaveID}
      onLeaveProcessClose={handleLeaveProcessClose}
    />
  );
}

export default ApproveLeaveController;
