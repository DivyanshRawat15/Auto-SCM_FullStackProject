import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, User, Mail, Lock, UserCircle, ShieldCheck } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'USER' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); setError(''); setLoading(true);
        try {
            await register(formData.name, formData.email, formData.password, formData.role);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed.');
        } finally { setLoading(false); }
    };

    return (
        <div className="container py-5 d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
            <div className="card shadow-lg border-0 p-4 p-md-5 rounded-4" style={{ maxWidth: '450px', width: '100%' }}>
                <div className="text-center mb-5">
                    <div className="bg-primary bg-opacity-10 d-inline-block p-3 rounded-circle mb-3">
                        <UserPlus className="text-primary" size={32} />
                    </div>
                    <h2 className="fw-bold mb-1">Join Auto-SCM</h2>
                    <p className="text-muted small">Create your account to start comparing vehicles</p>
                </div>

                {error && <div className="alert alert-danger border-0 small py-2 mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="row g-4">
                    <div className="col-12">
                        <div className="btn-group w-100 p-1 bg-light rounded-pill mb-2">
                            <button type="button" onClick={() => setFormData({ ...formData, role: 'USER' })} className={`btn btn-sm rounded-pill py-2 fw-bold d-flex align-items-center justify-content-center gap-2 border-0 ${formData.role === 'USER' ? 'btn-primary shadow-sm' : 'btn-light text-muted'}`}>
                                <User size={16} /> User
                            </button>
                            <button type="button" onClick={() => setFormData({ ...formData, role: 'ADMIN' })} className={`btn btn-sm rounded-pill py-2 fw-bold d-flex align-items-center justify-content-center gap-2 border-0 ${formData.role === 'ADMIN' ? 'btn-primary shadow-sm' : 'btn-light text-muted'}`}>
                                <ShieldCheck size={16} /> Admin
                            </button>
                        </div>
                    </div>

                    <div className="col-12">
                        <label className="form-label small fw-bold text-muted px-1">Full Name</label>
                        <div className="input-group">
                            <span className="input-group-text bg-light border-0"><UserCircle size={18} className="text-muted" /></span>
                            <input type="text" required className="form-control bg-light border-0 py-2" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                    </div>

                    <div className="col-12">
                        <label className="form-label small fw-bold text-muted px-1">Email Address</label>
                        <div className="input-group">
                            <span className="input-group-text bg-light border-0"><Mail size={18} className="text-muted" /></span>
                            <input type="email" required className="form-control bg-light border-0 py-2" placeholder="name@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                    </div>

                    <div className="col-12">
                        <label className="form-label small fw-bold text-muted px-1">Password</label>
                        <div className="input-group">
                            <span className="input-group-text bg-light border-0"><Lock size={18} className="text-muted" /></span>
                            <input type="password" required className="form-control bg-light border-0 py-2" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                        </div>
                    </div>

                    <div className="col-12 mt-5">
                        <button type="submit" disabled={loading} className="btn btn-primary w-100 py-3 rounded-pill shadow-sm fw-bold">
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </div>
                </form>

                <p className="text-center mt-5 small text-muted">
                    Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-none">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
