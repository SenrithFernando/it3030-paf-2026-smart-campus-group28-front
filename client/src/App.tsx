import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate } from
'react-router-dom';

import './App.css'
import { DashboardLayout } from './components/DashboardLayout';
import { FacilitiesAssets } from './pages/FacilitiesAssets';

export function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        
   <Route path="/" element={<Navigate to="/dashboard" replace />} />
   <Route path="/facilities" element={ <DashboardLayout> <FacilitiesAssets /> </DashboardLayout> } /> 
  
  </Routes>
  </Router>);

}

export default App
