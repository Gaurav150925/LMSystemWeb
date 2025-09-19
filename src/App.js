import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Leaves from './Components/LeaveManagement/LeaveGrid';
import ApproveLeavePage from './Components/LeaveManagement/ApproveLeavePage';
import Unauthorized from './Components/UnAthorized';
import './App.css';
import Layout from './Components/Layout/Layout';  
import 'bootstrap/dist/css/bootstrap.min.css';
import LeaveGrid from './Components/LeaveManagement/LeaveGrid';
import UserRegistrationForm from './Components/Login/UserRegistrationForm';
import { AuthProvider, useAuth } from './AuthComponent/AuthContext';
import { Navigate } from 'react-router-dom';
import LeaveHistoryGrid from './Components/LeaveManagement/LeaveHistoryGrid';

function App() {

  
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};


  return (
    <AuthProvider>
      <BrowserRouter>
          <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<UserRegistrationForm />} />
        
          <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route path="/leaves" element={<LeaveGrid />} />
            <Route path="/approveleave" element={<ApproveLeavePage />} />
            <Route path="/leaves" element={<Leaves />} />
            <Route path="/leaveshistory" element={<LeaveHistoryGrid />} />
          </Route>

          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
