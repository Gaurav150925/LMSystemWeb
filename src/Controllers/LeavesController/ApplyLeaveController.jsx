import React, { useState } from "react";
import { toast } from "react-toastify";
import apiService from "../../Services/apiService";
import ApplyLeaveForm from "../../Components/LeaveManagement/ApplyLeaveForm";

function ApplyLeaveController({ onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    reason: "",
    fromDate: "",
    toDate: "",
    createdBy: 1,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateDates = (fromDate, toDate) => {
    if (!fromDate || !toDate) return "";
    if (fromDate > toDate) return "From date cannot be after To date.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dateRangeError = validateDates(formData.fromDate, formData.toDate);
    if (dateRangeError) {
      toast.warning("Kindly check the date range");
      return;
    }

    try {
      const res = await apiService.post("/api/LeaveRequest", formData);

      if (res?.error) {
        toast.error(res.message || "Failed to apply leave");
      } else {
        toast.success("Leave applied successfully!");
        onClose();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "Something went wrong while applying for leave kindly check if leave are overlapping."
      );
    }
  };

  return (
    <ApplyLeaveForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default ApplyLeaveController;
