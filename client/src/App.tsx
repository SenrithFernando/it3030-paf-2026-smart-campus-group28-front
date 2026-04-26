import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate } from
'react-router-dom';
<<<<<<< HEAD
import { DashboardLayout } from './components/DashboardLayout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { UserProfile } from './pages/UserProfile';
=======

import './App.css'
import { DashboardLayout } from './components/DashboardLayout';
import { FacilitiesAssets } from './pages/FacilitiesAssets';
>>>>>>> 2ebc12ff4afbd605a0095fff504d07ad80f0a482

export function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
<<<<<<< HEAD
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes wrapped in DashboardLayout */}
        <Route path="/" element={<Navigate to="/profile" replace />} />

        <Route
          path="/profile"
          element={
          <DashboardLayout>
              <UserProfile />
            </DashboardLayout>
          } />
        

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/profile" replace />} />
      </Routes>
    </Router>);
=======
        
   <Route path="/" element={<Navigate to="/dashboard" replace />} />
   <Route path="/facilities" element={ <DashboardLayout> <FacilitiesAssets /> </DashboardLayout> } /> 
  
  </Routes>
  </Router>);
>>>>>>> 2ebc12ff4afbd605a0095fff504d07ad80f0a482

}