import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CompareProvider } from './context/CompareContext';
import Navbar from './components/Navbar';
import CompareStickyBar from './components/CompareStickyBar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VehicleDetail from './pages/VehicleDetail';
import Comparison from './pages/Comparison';
import AdminDashboard from './pages/AdminDashboard';
import MyBookings from './pages/MyBookings';

function App() {
  return (
    <AuthProvider>
      <CompareProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100">
            <Navbar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cars" element={<Home type="Car" />} />
              <Route path="/cars/:brand" element={<Home type="Car" />} />
              <Route path="/bikes" element={<Home type="Bike" />} />
              <Route path="/bikes/:brand" element={<Home type="Bike" />} />
              <Route path="/heavy-duties" element={<Home type="HeavyDuty" />} />
              <Route path="/heavy-duties/:brand" element={<Home type="HeavyDuty" />} />
              <Route path="/vehicle/:id" element={<VehicleDetail />} />
              <Route path="/compare" element={<Comparison />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* User/Admin Routes */}
              <Route element={<ProtectedRoute roles={['ADMIN', 'USER']} />}>
                <Route path="/my-bookings" element={<MyBookings />} />
              </Route>
              
              {/* Admin Routes */}
              <Route element={<ProtectedRoute roles={['ADMIN']} />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
            </Routes>
          </main>
          <footer className="border-top py-4 bg-white mt-auto">
            <div className="container text-center text-muted small">
              &copy; {new Date().getFullYear()} Auto-SCM. All rights reserved.
            </div>
          </footer>
          <CompareStickyBar />
        </div>
      </Router>
      </CompareProvider>
    </AuthProvider>
  );
}

export default App;
