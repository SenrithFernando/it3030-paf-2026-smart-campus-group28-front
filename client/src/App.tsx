import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate } from
'react-router-dom';
import { DashboardLayout } from './components/DashboardLayout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { UserProfile } from './pages/UserProfile';

export function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
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

}