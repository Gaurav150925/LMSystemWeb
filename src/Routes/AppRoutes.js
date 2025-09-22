// src/Routes/AppRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginController from "../Controllers/LoginController/Logincontroller";
import UserRegistrationController from "../Controllers/LoginController/UserRegistrationController";
import LeaveGridController from "../Controllers/LeavesController/LeaveGridController";
import LeaveHistoryGridController from "../Controllers/LeavesController/LeaveHistoryGridController";
import ApproveLeaveController from "../Controllers/LeavesController/ApproveLeaveController";
import Unauthorized from "../Components/UnAthorized";
import Layout from "../Components/Layout/Layout";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../assets/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginController />} />
      <Route path="/" element={<LoginController />} />
      <Route path="/register" element={<UserRegistrationController />} />

      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="/leaves" element={<LeaveGridController />} />
        <Route path="/approveleave" element={<ApproveLeaveController />} />
        <Route path="/leaveshistory" element={<LeaveHistoryGridController />} />
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
