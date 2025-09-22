import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiService from "../../Services/apiService";
import UpdateLeaveForm from "../../Components/LeaveManagement/UpdateLeaveForm";

function UpdateLeaveController({ onClose, leave }) {
  const toDateInput = (value) => {
    if (!value) return "";
    const d = typeof value === "string" ? new Date(value) : value;
    if (Number.isNaN(d.getTime())) return "";
    const tzOffset = d.getTimezoneOffset();
    const local = new Date(d.getTime() - tzOffset * 60_000);
    return local.toISOString().slice(0, 10);
  };

  const todayInput = () => toDateInput(new Date());

  const [formData, setFormData] = useState({
    title: leave?.title ?? "",
    reason: leave?.reason ?? "",
    fromDate: toDateInput(leave?.fromDate) || todayInput(),
    toDate: toDateInput(leave?.toDate) || todayInput(),
    status: leave?.status ?? "Pending",
  });

  useEffect(() => {
    setFormData({
      title: leave?.title ?? "",
      reason: leave?.reason ?? "",
      fromDate: toDateInput(leave?.fromDate) || todayInput(),
      toDate: toDateInput(leave?.toDate) || todayInput(),
      status: leave?.status ?? "Pending",
    });
  }, [leave?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

    if (!formData.title?.trim()) {
      toast.warning("Title is required.");
      return;
    }

    const payload = {
      title: formData.title,
      reason: formData.reason,
      fromDate: formData.fromDate,
      toDate: formData.toDate,
      status: formData.status,
    };

    try {
      const res = await apiService.put(
        `/api/LeaveRequest/${leave.id}`,
        payload
      );

      if (res === null || res.status === 204) {
        toast.success("Leave updated successfully!");
        onClose();
      } else if (res.status === 409) {
        toast.error(
          "Only 'Pending' requests can be updated, or it changed meanwhile."
        );
      } else if (res.status === 400) {
        toast.error(res.message || "Bad request");
      } else if (res.status === 404) {
        toast.error("Leave not found.");
      } else {
        throw new Error(`Unexpected response: ${JSON.stringify(res)}`);
      }
    } catch (err) {
      console.error("Error updating leave:", err);
      toast.error("Failed to update leave.");
    }
  };

  const isPending = (formData.status || "").toLowerCase() === "pending";

  return (
    <UpdateLeaveForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isPending={isPending}
    />
  );
}

export default UpdateLeaveController;
