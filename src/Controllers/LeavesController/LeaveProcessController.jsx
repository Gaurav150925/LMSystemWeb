import React, { useState } from "react";
import { toast } from "react-toastify";
import apiService from "../../Services/apiService";
import LeaveProcessForm from "../../Components/LeaveManagement/LeaveProcess";

function LeaveProcessController({ onClose, leaveID }) {
  const [formData, setFormData] = useState({
    status: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
   e.preventDefault();  

    try {
      const res = await apiService.put(`/api/LeaveRequest/${leaveID}/status`, formData);

      if (res) {
        toast.success("Leave processed successfully!");
        console.log("Updated Leave:", res.item1);
        console.log("Leave History:", res.item2);
        onClose();
      } else if (res?.error) {
        toast.error(res.message || "Failed to process response. Please try again.");
      } else {
        toast.error("Unexpected response format.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong while processing the leave.");
    }
  };

  return (
    <LeaveProcessForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default LeaveProcessController;
