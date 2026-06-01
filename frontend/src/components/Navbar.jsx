import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Car, MapPin, User, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <header className="carwale-nav sticky-top">
            <div className="container d-flex align-items-center justify-content-between py-1">
                {/* Brand Logo & Main Nav */}
                <div className="d-flex align-items-center">
                    <Link to="/" className="text-decoration-none d-flex align-items-center me-5 py-2">
                        <div className="bg-primary-container p-2 rounded-2 me-2 shadow-sm">
                            <Car size={24} color="white" />
                        </div>
                        <span className="fs-4 fw-800 tracking-tight text-dark">AUTO<span style={{ color: 'var(--primary-color)' }}>SCM</span></span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="d-none d-lg-flex align-items-center h-100 gap-2">
                        {/* Vehicles Dropdown */}
                        <div className="dropdown" onMouseLeave={() => setDropdownOpen(false)}>
                            <button 
                                className="nav-link fw-bold px-3 py-3 d-flex align-items-center gap-1 border-0 bg-transparent" 
                                type="button" 
                                onMouseEnter={() => setDropdownOpen(true)}
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                VEHICLES
                                <span className={`transition-all ${dropdownOpen ? 'rotate-180' : ''}`} style={{ fontSize: '10px' }}>▼</span>
                            </button>
                            {dropdownOpen && (
                                <div className="dropdown-menu show border-0 shadow-lg animate-in mt-0 p-2" style={{ borderRadius: 'var(--radius-md)' }}>
                                    <Link to="/cars" className={`dropdown-item py-2 px-3 rounded-2 fw-medium ${isActive('/cars') ? 'bg-light text-danger' : ''}`}>NEW CARS</Link>
                                    <Link to="/bikes" className={`dropdown-item py-2 px-3 rounded-2 fw-medium ${isActive('/bikes') ? 'bg-light text-danger' : ''}`}>NEW BIKES</Link>
                                    <Link to="/heavy-duties" className={`dropdown-item py-2 px-3 rounded-2 fw-medium ${isActive('/heavy-duties') ? 'bg-light text-danger' : ''}`}>HEAVY DUTY</Link>
                                </div>
                            )}
                        </div>
                        <Link to="/compare" className={`nav-link fw-bold px-3 py-3 ${isActive('/compare') ? 'text-danger' : ''}`}>COMPARE</Link>
                    </nav>
                </div>

                {/* Right Actions */}
                <div className="d-flex align-items-center gap-4">
                    {/* Location Selector (Mock) */}
                    <div className="d-none d-md-flex align-items-center cursor-pointer text-secondary hover-primary fw-medium transition-all">
                        <MapPin size={18} className="me-1" />
                        <span className="small">Select City</span>
                    </div>

                    {/* User Profile / Login */}
                    {user ? (
                        <div className="d-flex align-items-center gap-3 border-start ps-4">
                            {user.role === 'ADMIN' && (
                                <Link to="/admin" className="btn btn-sm btn-outline-danger fw-bold px-3">Admin Panel</Link>
                            )}
                            <Link to="/my-bookings" className="d-flex align-items-center gap-2 cursor-pointer group text-decoration-none">
                                <div className="bg-light rounded-circle p-2 d-flex align-items-center justify-content-center transition-all group-hover:bg-primary-subtle">
                                    <User size={18} className="text-secondary" />
                                </div>
                                <div className="d-none d-lg-block text-dark">
                                    <p className="mb-0 small text-muted lh-1">Welcome,</p>
                                    <p className="mb-0 fw-bold lh-1 group-hover:text-primary transition-all">{user.name}</p>
                                </div>
                            </Link>
                            <button onClick={handleLogout} className="btn btn-light btn-sm rounded-circle p-2 border-0 ms-2" title="Logout">
                                <LogOut size={16} className="text-muted" />
                            </button>
                        </div>
                    ) : (
                        <div className="d-flex align-items-center gap-3 border-start ps-4">
                            <button className="btn btn-link text-dark text-decoration-none fw-bold small p-0 hover-primary transition-all" onClick={() => navigate('/login')}>
                                LOG IN
                            </button>
                            <button className="btn btn-primary btn-sm fw-bold px-3 rounded-1" onClick={() => navigate('/register')}>
                                REGISTER
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Nav Toggle */}
            <div className="d-flex d-lg-none border-top bg-light overflow-auto py-2 px-3 gap-3 no-scrollbar">
                <Link to="/cars" className="text-decoration-none text-dark fw-medium text-nowrap">NEW CARS</Link>
                <Link to="/bikes" className="text-decoration-none text-dark fw-medium text-nowrap">NEW BIKES</Link>
                <Link to="/heavy-duties" className="text-decoration-none text-dark fw-medium text-nowrap">HEAVY DUTY</Link>
                <Link to="/compare" className="text-decoration-none text-dark fw-medium text-nowrap">COMPARE ALL</Link>
            </div>
        </header>
    );
};

export default Navbar;
