import React, { useState } from "react";
import UserRegistrationForm from "../../Components/Login/UserRegistrationForm";
import apiService from "../../Services/apiService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UserRegistrationController() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password, role } = formData;

    if (!username || !password || !role) {
      setMessage("All fields are required.");
      toast.warning("All fields are required.");
      return;
    }

    try {
      const result = await apiService.post("/api/Register", formData, {
        Authorization: undefined,
      });

      if (!result || result.error) {
        toast.error("Registration failed");
        setMessage("Registration failed. Please try again.");
        return;
      }

      setMessage(`User ${username} registered successfully as ${role}.`);
      toast.success(`User ${username} registered successfully as ${role}.`);

      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Registration failed. Please try again.");
    }
  };
  return (
    <UserRegistrationForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      message={message}
    />
  );
}

export default UserRegistrationController;
