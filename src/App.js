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

function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/Login" element={<Login />} />
         <Route path="/" element={<Login />} />
         <Route path="/register" element={<UserRegistrationForm />} />
       
        <Route element={<Layout />}>
          <Route path="/leaves" element={<LeaveGrid />} />
          <Route path="/approveleave" element={<ApproveLeavePage />} />
          <Route path="/leaves" element={<Leaves />} />
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
