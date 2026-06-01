import React, { useState, useEffect } from 'react';
import api from '../services/api';
import VehicleCard from '../components/VehicleCard';
import { Calendar, Car, Clock, CheckCircle, XCircle, Settings, Sparkles } from 'lucide-react';

const MyBookings = () => {
    // Note: This component acts as the User Dashboard
    const [bookings, setBookings] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [prefs, setPrefs] = useState({ preferred_fuel: '', budget_limit: '' });
    const [loading, setLoading] = useState(true);
    const [savingPrefs, setSavingPrefs] = useState(false);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const [bookRes, prefsRes, recRes] = await Promise.all([
                api.get('/bookings/my-bookings').catch(() => ({ data: [] })),
                api.get('/users/preferences').catch(() => ({ data: { preferred_fuel: '', budget_limit: '' } })),
                api.get('/vehicles/recommendations').catch(() => ({ data: [] }))
            ]);
            
            setBookings(bookRes.data);
            setPrefs({
                preferred_fuel: prefsRes.data?.preferred_fuel || '',
                budget_limit: prefsRes.data?.budget_limit || ''
            });
            setRecommendations(recRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSavePreferences = async (e) => {
        e.preventDefault();
        setSavingPrefs(true);
        try {
            await api.put('/users/preferences', prefs);
            // Refresh recommendations based on new preferences
            const recRes = await api.get('/vehicles/recommendations');
            setRecommendations(recRes.data);
            alert("Preferences saved successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to save preferences.");
        } finally {
            setSavingPrefs(false);
        }
    };

    const getStatusBadge = (status) => {
        switch(status) {
            case 'CONFIRMED': return <span className="badge bg-success-subtle text-success border border-success fw-bold px-3 py-2 rounded-pill d-flex align-items-center gap-1"><CheckCircle size={14}/> Confirmed</span>;
            case 'CANCELLED': return <span className="badge bg-danger-subtle text-danger border border-danger fw-bold px-3 py-2 rounded-pill d-flex align-items-center gap-1"><XCircle size={14}/> Cancelled</span>;
            default: return <span className="badge bg-warning-subtle text-warning border border-warning fw-bold px-3 py-2 rounded-pill d-flex align-items-center gap-1"><Clock size={14}/> Pending</span>;
        }
    };

    if (loading) {
        return <div className="text-center py-5 mt-5"><div className="spinner-border text-primary"></div></div>;
    }

    return (
        <div className="container py-5 animate-in fade-in">
            <div className="mb-5 border-bottom pb-3">
                <h2 className="fw-bold text-dark mb-1">User Dashboard</h2>
                <p className="text-muted mb-0">Manage your test drives, preferences, and explore personalized recommendations.</p>
            </div>
            
            <div className="row g-4 mb-5">
                {/* Preferences Form */}
                <div className="col-lg-4">
                    <div className="card shadow-sm border-0 p-4 h-100 bg-light-subtle">
                        <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
                            <Settings size={24} className="text-secondary"/> My Preferences
                        </h4>
                        <form onSubmit={handleSavePreferences}>
                            <div className="mb-3">
                                <label className="form-label fw-bold small text-muted">Preferred Fuel Type</label>
                                <select 
                                    className="form-select p-2" 
                                    value={prefs.preferred_fuel} 
                                    onChange={e => setPrefs({...prefs, preferred_fuel: e.target.value})}
                                >
                                    <option value="">Any Fuel</option>
                                    <option value="Petrol">Petrol</option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="Electric">Electric</option>
                                    <option value="CNG">CNG</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-bold small text-muted">Maximum Budget (₹)</label>
                                <input 
                                    type="number" 
                                    className="form-control p-2" 
                                    placeholder="e.g. 1500000"
                                    value={prefs.budget_limit}
                                    onChange={e => setPrefs({...prefs, budget_limit: e.target.value})}
                                />
                            </div>
                            <button type="submit" disabled={savingPrefs} className="btn btn-dark w-100 fw-bold py-2 shadow-sm">
                                {savingPrefs ? 'Saving...' : 'Save Preferences'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="col-lg-8">
                    <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
                        <Sparkles size={24} className="text-warning"/> Recommended For You
                    </h4>
                    {recommendations.length === 0 ? (
                        <div className="card shadow-sm border-0 p-5 text-center bg-light-subtle h-100 d-flex flex-column justify-content-center">
                            <p className="text-muted mb-0">No recommendations found. Try adjusting your preferences or budget.</p>
                        </div>
                    ) : (
                        <div className="row g-3">
                            {recommendations.map(v => (
                                <VehicleCard key={v.id} vehicle={v} className="col-md-6 mb-4" />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <hr className="my-5 opacity-10" />

            {/* Bookings */}
            <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
                <Calendar size={28} className="text-primary"/> My Test Drive Bookings
            </h4>
            
            {bookings.length === 0 ? (
                <div className="card border-0 shadow-sm text-center py-5 mb-5 bg-light-subtle">
                    <div className="mx-auto bg-white rounded-circle p-4 mb-3 d-inline-block shadow-sm">
                        <Car size={40} className="text-muted"/>
                    </div>
                    <h5 className="fw-bold text-dark mb-2">No Bookings Yet</h5>
                    <p className="text-muted mb-0">You haven't booked any test drives. Check out your recommendations above!</p>
                </div>
            ) : (
                <div className="row g-4 mb-5">
                    {bookings.map(b => (
                        <div key={b.id} className="col-lg-4 col-md-6">
                            <div className="card border border-light shadow-sm h-100 p-4 transition-all hover-primary-border">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div>
                                        <p className="text-muted small fw-bold mb-1">Booking #{b.id}</p>
                                        <h5 className="fw-bold mb-1 text-truncate">{b.brand_name} {b.model_name}</h5>
                                        <span className="badge bg-light text-dark border">{b.fuel_type}</span>
                                    </div>
                                    {getStatusBadge(b.status)}
                                </div>
                                <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center gap-2 text-muted small fw-medium">
                                        <Calendar size={16}/> {new Date(b.booking_date).toLocaleDateString()}
                                    </div>
                                    <span className="fw-bold text-dark">₹ {b.price?.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
