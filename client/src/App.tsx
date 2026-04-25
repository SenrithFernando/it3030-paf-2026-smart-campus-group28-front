import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate } from
'react-router-dom';
import { DashboardLayout } from './components/DashboardLayout';

import './App.css'

export function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/bookings" element={<div>Bookings Page</div>} />
          <Route path="/" element={<Navigate to="/bookings" replace />} />
        </Routes>
      </DashboardLayout>
    </Router>);

}

export default App
