import React, { useEffect, useState } from "react";

function UpdateLeaveForm({ onClose, leave }) {

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
    if (!fromDate || !toDate) return ''; 
    
    if (fromDate > toDate) return 'From date cannot be after To date.';
    return '';
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
      const dateRangeError = validateDates(formData.fromDate, formData.toDate);
    if(dateRangeError){
      alert("kindly check the date range"); 
      return; 
    }
    if (!formData.title?.trim()) return alert("Title is required.");
    if (new Date(formData.fromDate) > new Date(formData.toDate)) {
      return alert("From date cannot be after To date.");
    }

   
    const payload = {
      title: formData.title,
      reason: formData.reason,
      fromDate: formData.fromDate, // "YYYY-MM-DD"
      toDate: formData.toDate,     // "YYYY-MM-DD"
      status: formData.status,
    };

  

    const token = localStorage.getItem("AuthToken");

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/LeaveRequest/${leave.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (res.status === 204) {
        alert("Leave updated successfully!");
        onClose(); // ideally also refresh list in parent
      } else if (res.status === 409) {
        alert("Only 'Pending' requests can be updated, or it changed meanwhile.");
      } else if (res.status === 400) {
        const text = await res.text();
        alert(text || "Bad request");
      } else if (res.status === 404) {
        alert("Leave not found.");
      } else {
        const text = await res.text();
        throw new Error(`${res.status} ${text}`);
      }
    } catch (err) {
      console.error("Error updating leave:", err);
      alert("Failed to update leave.");
    }
  };

  const isPending = (formData.status || "").toLowerCase() === "pending";

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
          disabled={!isPending} // optional: lock when not pending
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
          // min={todayInput()} // uncomment if you want to prevent past dates
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
          // min={formData.fromDate || todayInput()} // ensure To >= From
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
          // If only admins can change, disable for normal users:
          // disabled={!isAdmin}
        >
          <option value="">-- Select Status --</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <button type="submit" className="btn btn-success" disabled={!isPending}>
        Submit
      </button>
    </form>
  );
}

export default UpdateLeaveForm;
