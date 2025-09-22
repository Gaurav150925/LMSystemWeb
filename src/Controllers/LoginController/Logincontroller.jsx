import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../../Components/Login/Login";
import apiService from "../../Services/apiService";
import { toast } from "react-toastify";

function LoginController() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { username, password };

    try {
      // Use apiService.post for login
      const result = await apiService.post("/api/Login", loginData);
      debugger;
      if (!result?.token) {
        toast.error("Login failed: No token received");
        return;
      }

      localStorage.setItem("AuthToken", result.token);
      toast.success("Login successful");
      navigate("/leaves");
    } catch (error) {
      toast.error("Login failed");
      console.error("Error during login:", error);
    }
  };

  return (
    <Login
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
}

export default LoginController;
