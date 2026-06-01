import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { LayoutDashboard, Car, Users, Plus, Edit, Trash2, ShieldCheck, BarChart3, Package, Fuel, Zap, X, Calendar, Eye, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState({ users: 0, vehicles: 0, categories: [] });
    const [users, setUsers] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [metadata, setMetadata] = useState({ types: [], brands: [], models: [] });
    const [allBrands, setAllBrands] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
        model_id: '', fuel_type: '', price: '', engine: '', mileage: '', transmission: '', seating_capacity: '', description: '', image_url: ''
    });

    useEffect(() => {
        fetchStats();
        fetchMetadata();
        fetchUsers();
        fetchVehicles();
        fetchBookings();
        fetchAllBrands();
    }, []);

    const fetchStats = async () => {
        try { const res = await api.get('/vehicles/dashboard/stats'); setStats(res.data); } catch (err) { console.error(err); }
    };
    const fetchBookings = async () => {
        try { const res = await api.get('/bookings'); setBookings(res.data); } catch (err) { console.error(err); }
    };
    const fetchMetadata = async () => {
        try { const res = await api.get('/vehicles/metadata'); setMetadata(res.data); } catch (err) { console.error(err); }
    };
    const fetchUsers = async () => {
        try { const res = await api.get('/users'); setUsers(res.data); } catch (err) { console.error(err); }
    };
    const fetchVehicles = async () => {
        try { const res = await api.get('/vehicles'); setVehicles(res.data); } catch (err) { console.error(err); }
    };
    const fetchAllBrands = async () => {
        try { const res = await api.get('/brands'); setAllBrands(res.data); } catch (err) { console.error(err); }
    };

    const handleBrandLogoUpload = async (e, brandId) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const uploadData = new FormData();
        uploadData.append('brand_logo', file);
        
        setCurrentId(brandId);
        setIsUploading(true);
        try {
            await api.post(`/brands/${brandId}/uploadLogo`, uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            fetchAllBrands();
        } catch (err) {
            console.error('Brand logo upload failed', err);
            alert('Failed to upload brand logo.');
        } finally {
            setIsUploading(false);
            setCurrentId(null);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const uploadData = new FormData();
        uploadData.append('image', file);
        
        setIsUploading(true);
        try {
            const res = await api.post('/upload', uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            // Backend returns relative path e.g., /uploads/filename.jpg
            // Save absolute URL to DB to match existing schema
            setFormData({ ...formData, image_url: `http://localhost:5000${res.data.url}` });
        } catch (err) {
            console.error('Image upload failed', err);
            alert('Failed to upload image. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleUpdateBookingStatus = async (id, status) => {
        try {
            await api.put(`/bookings/${id}/status`, { status });
            fetchBookings();
        } catch (err) { console.error(err); }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try { await api.delete(`/vehicles/${id}`); fetchVehicles(); fetchStats(); } catch (err) { console.error(err); }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editMode) { await api.put(`/vehicles/${currentId}`, formData); }
            else { await api.post('/vehicles', formData); }
            setShowModal(false); fetchVehicles(); fetchStats(); resetForm();
        } catch (err) { console.error(err); }
    };

    const resetForm = () => {
        setFormData({ model_id: '', fuel_type: '', price: '', engine: '', mileage: '', transmission: '', seating_capacity: '', description: '', image_url: '' });
        setEditMode(false); setCurrentId(null);
    };

    const handleEdit = (v) => {
        setFormData({ model_id: v.model_id, fuel_type: v.fuel_type, price: v.price, engine: v.engine, mileage: v.mileage, transmission: v.transmission, seating_capacity: v.seating_capacity, description: v.description, image_url: v.variant_image || '' });
        setEditMode(true); setCurrentId(v.id); setShowModal(true);
    };

    return (
        <div className="container py-5">
            <div className="row g-4">
                {/* Sidebar */}
                <div className="col-lg-3">
                    <div className="card shadow-sm border-0 p-3 sticky-top" style={{ top: '90px' }}>
                        <div className="d-flex align-items-center gap-2 mb-4 p-2">
                            <ShieldCheck className="text-primary" size={24} />
                            <h5 className="fw-bold mb-0">Admin Panel</h5>
                        </div>
                        <div className="nav flex-column nav-pills gap-2">
                            <button onClick={() => setActiveTab('dashboard')} className={`btn text-start d-flex align-items-center gap-3 px-3 py-2 rounded-3 ${activeTab === 'dashboard' ? 'btn-primary shadow-sm' : 'btn-light text-muted'}`}>
                                <LayoutDashboard size={20} /> Dashboard
                            </button>
                            <button onClick={() => setActiveTab('vehicles')} className={`btn text-start d-flex align-items-center gap-3 px-3 py-2 rounded-3 ${activeTab === 'vehicles' ? 'btn-primary shadow-sm' : 'btn-light text-muted'}`}>
                                <Car size={20} /> Vehicles
                            </button>
                            <button onClick={() => setActiveTab('users')} className={`btn text-start d-flex align-items-center gap-3 px-3 py-2 rounded-3 ${activeTab === 'users' ? 'btn-primary shadow-sm' : 'btn-light text-muted'}`}>
                                <Users size={20} /> Users
                            </button>
                            <button onClick={() => setActiveTab('bookings')} className={`btn text-start d-flex align-items-center gap-3 px-3 py-2 rounded-3 ${activeTab === 'bookings' ? 'btn-primary shadow-sm' : 'btn-light text-muted'}`}>
                                <Calendar size={20} /> Bookings
                            </button>
                            <button onClick={() => setActiveTab('brands')} className={`btn text-start d-flex align-items-center gap-3 px-3 py-2 rounded-3 ${activeTab === 'brands' ? 'btn-primary shadow-sm' : 'btn-light text-muted'}`}>
                                <Zap size={20} /> Brands
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="col-lg-9">
                    {activeTab === 'dashboard' && (
                        <div className="animate-in fade-in">
                            <h2 className="fw-bold mb-4">Dashboard</h2>
                            <div className="row g-4 mb-5">
                                <div className="col-md-4">
                                    <div className="card shadow-sm border-0 border-start border-primary border-4 p-4 text-center">
                                        <Users className="text-primary opacity-25 mx-auto mb-2" size={40} />
                                        <h2 className="fw-bold mb-0">{stats.users}</h2>
                                        <p className="small text-muted fw-bold text-uppercase">Total Users</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card shadow-sm border-0 border-start border-success border-4 p-4 text-center">
                                        <Package className="text-success opacity-25 mx-auto mb-2" size={40} />
                                        <h2 className="fw-bold mb-0">{stats.vehicles}</h2>
                                        <p className="small text-muted fw-bold text-uppercase">Vehicles</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card shadow-sm border-0 border-start border-warning border-4 p-4 text-center">
                                        <BarChart3 className="text-warning opacity-25 mx-auto mb-2" size={40} />
                                        <h2 className="fw-bold mb-0">{stats.categories?.length || 0}</h2>
                                        <p className="small text-muted fw-bold text-uppercase">Categories</p>
                                    </div>
                                </div>
                            </div>

                            <div className="card shadow-sm border-0 p-4 mb-4">
                                <h5 className="fw-bold mb-4">Category Breakdown</h5>
                                {stats.categories?.map(cat => (
                                    <div key={cat.name} className="mb-4">
                                        <div className="d-flex justify-content-between small fw-bold mb-2 text-uppercase text-muted">
                                            <span>{cat.name}</span>
                                            <span>{cat.count} Units</span>
                                        </div>
                                        <div className="progress rounded-pill shadow-none border-0" style={{ height: '8px' }}>
                                            <div className="progress-bar bg-primary rounded-pill shadow-none" style={{ width: `${(cat.count / Math.max(1, stats.vehicles)) * 100}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h4 className="fw-bold mb-3 mt-5">Top Performers</h4>
                            <div className="row g-4 mt-2 mb-5">
                                <div className="col-lg-4">
                                    <div className="card shadow-sm border-0 p-4 h-100">
                                        <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                                            <Eye size={18} className="text-primary"/> Most Viewed
                                        </h5>
                                        {stats.mostViewed?.length > 0 ? stats.mostViewed.map((v, i) => (
                                            <div key={v.id} className="d-flex align-items-center mb-3">
                                                <div className="fw-bold text-muted me-3">#{i + 1}</div>
                                                <div className="flex-grow-1">
                                                    <div className="fw-bold small">{v.brand_name} {v.model_name}</div>
                                                </div>
                                                <div className="badge bg-primary-subtle text-primary fw-bold rounded-pill py-1">{v.action_count} views</div>
                                            </div>
                                        )) : <div className="text-muted small">No data yet</div>}
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="card shadow-sm border-0 p-4 h-100">
                                        <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                                            <BarChart3 size={18} className="text-warning"/> Most Compared
                                        </h5>
                                        {stats.mostCompared?.length > 0 ? stats.mostCompared.map((v, i) => (
                                            <div key={v.id} className="d-flex align-items-center mb-3">
                                                <div className="fw-bold text-muted me-3">#{i + 1}</div>
                                                <div className="flex-grow-1">
                                                    <div className="fw-bold small">{v.brand_name} {v.model_name}</div>
                                                </div>
                                                <div className="badge bg-warning-subtle text-warning fw-bold rounded-pill py-1">{v.action_count} compares</div>
                                            </div>
                                        )) : <div className="text-muted small">No data yet</div>}
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="card shadow-sm border-0 p-4 h-100">
                                        <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                                            <CheckCircle size={18} className="text-success"/> Most Booked
                                        </h5>
                                        {stats.mostBooked?.length > 0 ? stats.mostBooked.map((v, i) => (
                                            <div key={v.id} className="d-flex align-items-center mb-3">
                                                <div className="fw-bold text-muted me-3">#{i + 1}</div>
                                                <div className="flex-grow-1">
                                                    <div className="fw-bold small">{v.brand_name} {v.model_name}</div>
                                                </div>
                                                <div className="badge bg-success-subtle text-success fw-bold rounded-pill py-1">{v.action_count} bookings</div>
                                            </div>
                                        )) : <div className="text-muted small">No data yet</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'vehicles' && (
                        <div className="animate-in fade-in">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 className="fw-bold mb-0">Vehicles</h2>
                                <button onClick={() => { resetForm(); setShowModal(true); }} className="btn btn-primary rounded-pill px-4 shadow-sm">
                                    <Plus size={18} className="me-2" /> Add Vehicle
                                </button>
                            </div>

                            <div className="card shadow-sm border-0 overflow-hidden">
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0">
                                        <thead className="table-light small fw-bold text-uppercase text-muted">
                                            <tr>
                                                <th className="p-4">Model & Brand</th>
                                                <th className="p-4">Fuel</th>
                                                <th className="p-4">Price</th>
                                                <th className="p-4">Engine</th>
                                                <th className="p-4 text-end">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vehicles.map(v => (
                                                <tr key={v.id}>
                                                    <td className="p-4">
                                                        <div className="fw-bold">{v.brand_name}</div>
                                                        <div className="small text-muted">{v.model_name}</div>
                                                    </td>
                                                    <td className="p-4"><span className="badge bg-primary-subtle text-primary fw-bold rounded-pill px-3">{v.fuel_type}</span></td>
                                                    <td className="p-4 fw-bold">₹ {v.price?.toLocaleString()}</td>
                                                    <td className="p-4 small text-muted"><Zap size={14} className="me-1" /> {v.engine}</td>
                                                    <td className="p-4 text-end">
                                                        <div className="btn-group">
                                                            <button onClick={() => handleEdit(v)} className="btn btn-sm btn-light p-2 rounded-3 me-2 text-primary shadow-sm"><Edit size={16} /></button>
                                                            <button onClick={() => handleDelete(v.id)} className="btn btn-sm btn-light p-2 rounded-3 text-danger shadow-sm"><Trash2 size={16} /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <div className="animate-in fade-in">
                            <h2 className="fw-bold mb-4">Registered Users</h2>
                            <div className="card shadow-sm border-0 overflow-hidden">
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0">
                                        <thead className="table-light small fw-bold text-uppercase text-muted">
                                            <tr>
                                                <th className="p-4">User Details</th>
                                                <th className="p-4">Role</th>
                                                <th className="p-4">Email</th>
                                                <th className="p-4">Joined</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map(u => (
                                                <tr key={u.id}>
                                                    <td className="p-4 font-bold">{u.name}</td>
                                                    <td className="p-4">
                                                        <span className={`badge rounded-pill px-3 fw-bold ${u.role === 'ADMIN' ? 'bg-danger-subtle text-danger' : 'bg-success-subtle text-success'}`}>
                                                            {u.role}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-muted small">{u.email}</td>
                                                    <td className="p-4 text-muted small">{new Date(u.created_at).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'bookings' && (
                        <div className="animate-in fade-in">
                            <h2 className="fw-bold mb-4">Manage Bookings</h2>
                            <div className="card shadow-sm border-0 overflow-hidden">
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0">
                                        <thead className="table-light small fw-bold text-uppercase text-muted">
                                            <tr>
                                                <th className="p-4">Customer</th>
                                                <th className="p-4">Vehicle</th>
                                                <th className="p-4">Date</th>
                                                <th className="p-4">Status</th>
                                                <th className="p-4 text-end">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookings.map(b => (
                                                <tr key={b.id}>
                                                    <td className="p-4">
                                                        <div className="fw-bold">{b.user_name}</div>
                                                        <div className="small text-muted">{b.user_email}</div>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="fw-bold">{b.brand_name} {b.model_name}</div>
                                                    </td>
                                                    <td className="p-4 text-muted small">{new Date(b.booking_date).toLocaleDateString()}</td>
                                                    <td className="p-4">
                                                        <span className={`badge rounded-pill px-3 fw-bold ${b.status === 'CONFIRMED' ? 'bg-success-subtle text-success' : b.status === 'CANCELLED' ? 'bg-danger-subtle text-danger' : 'bg-warning-subtle text-warning'}`}>
                                                            {b.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-end">
                                                        <select 
                                                            className="form-select form-select-sm d-inline-block w-auto shadow-sm"
                                                            value={b.status}
                                                            onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value)}
                                                        >
                                                            <option value="PENDING">Pending</option>
                                                            <option value="CONFIRMED">Confirm</option>
                                                            <option value="CANCELLED">Cancel</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'brands' && (
                        <div className="animate-in fade-in">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 className="fw-bold mb-0">Brands Logos</h2>
                            </div>

                            <div className="card shadow-sm border-0 overflow-hidden">
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0">
                                        <thead className="table-light small fw-bold text-uppercase text-muted">
                                            <tr>
                                                <th className="p-4">Logo</th>
                                                <th className="p-4">Brand Name</th>
                                                <th className="p-4">Type</th>
                                                <th className="p-4 text-end">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allBrands.map(b => (
                                                <tr key={b.id}>
                                                    <td className="p-4">
                                                        {b.logo ? (
                                                            <img 
                                                                src={b.logo.startsWith('/public') ? `http://localhost:5000${b.logo}` : b.logo} 
                                                                alt={b.name} 
                                                                className="img-thumbnail border-0 rounded-3 shadow-sm bg-light"
                                                                style={{height: '60px', width: 'auto', objectFit: 'contain'}} 
                                                            />
                                                        ) : (
                                                            <span className="small fw-bold text-muted bg-light px-3 py-2 rounded-3">No Logo</span>
                                                        )}
                                                    </td>
                                                    <td className="p-4 fw-bold">{b.name}</td>
                                                    <td className="p-4"><span className="badge bg-secondary-subtle text-secondary rounded-pill px-3">{b.type}</span></td>
                                                    <td className="p-4 text-end">
                                                        <label className={`btn btn-sm px-3 py-2 rounded-3 shadow-sm m-0 fw-bold ${isUploading && currentId === b.id ? 'btn-secondary disabled' : 'btn-primary'}`} style={{cursor: 'pointer'}}>
                                                            {isUploading && currentId === b.id ? 'Uploading...' : 'Upload Logo'}
                                                            <input type="file" accept="image/*" hidden onChange={(e) => handleBrandLogoUpload(e, b.id)} disabled={isUploading}/>
                                                        </label>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content border-0 shadow-lg rounded-4 p-3">
                            <div className="modal-header border-0">
                                <h5 className="modal-title fw-bold">{editMode ? 'Edit Vehicle' : 'Add New Vehicle'}</h5>
                                <button type="button" className="btn-close shadow-none" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit} className="row g-4">
                                    <div className="col-12">
                                        <label className="form-label fw-bold small text-muted">Model Selection</label>
                                        <select className="form-select rounded-3 p-2" required value={formData.model_id} onChange={(e) => setFormData({ ...formData, model_id: e.target.value })}>
                                            <option value="">Select Model</option>
                                            {metadata.models.map(m => (
                                                <option key={m.id} value={m.id}>{metadata.brands.find(b => b.id === m.brand_id)?.name} {m.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small text-muted">Fuel Type</label>
                                        <input type="text" className="form-control rounded-3 p-2" placeholder="e.g. Petrol" required value={formData.fuel_type} onChange={(e) => setFormData({ ...formData, fuel_type: e.target.value })} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small text-muted">Price (INR)</label>
                                        <input type="number" className="form-control rounded-3 p-2" placeholder="e.g. 1500000" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold small text-muted">Engine</label>
                                        <input type="text" className="form-control rounded-3 p-2" placeholder="e.g. 1.5L VTEC" required value={formData.engine} onChange={(e) => setFormData({ ...formData, engine: e.target.value })} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold small text-muted">Mileage</label>
                                        <input type="text" className="form-control rounded-3 p-2" placeholder="e.g. 18.5 km/l" required value={formData.mileage} onChange={(e) => setFormData({ ...formData, mileage: e.target.value })} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold small text-muted">Seating</label>
                                        <input type="number" className="form-control rounded-3 p-2" placeholder="e.g. 5" required value={formData.seating_capacity} onChange={(e) => setFormData({ ...formData, seating_capacity: e.target.value })} />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label fw-bold small text-muted">Vehicle Image Upload</label>
                                        <input type="file" accept="image/*" className="form-control rounded-3 p-2" onChange={handleImageUpload} />
                                        {formData.image_url && (
                                            <div className="mt-3">
                                                <p className="small text-muted mb-1">Preview:</p>
                                                <img src={formData.image_url} alt="Preview" className="img-thumbnail border-0 shadow-sm rounded-3" style={{ height: '120px', objectFit: 'cover' }} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label fw-bold small text-muted">Description</label>
                                        <textarea className="form-control rounded-3 p-2" rows="3" placeholder="Vehicle details..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
                                    </div>
                                    <div className="col-12 d-flex gap-3 mt-4">
                                        <button type="submit" disabled={isUploading} className="btn btn-primary flex-fill py-3 rounded-pill shadow-sm">
                                            {isUploading ? 'Uploading Image...' : editMode ? 'Update Vehicle' : 'Save Vehicle'}
                                        </button>
                                        <button type="button" onClick={() => setShowModal(false)} className="btn btn-light flex-fill py-3 rounded-pill">Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
