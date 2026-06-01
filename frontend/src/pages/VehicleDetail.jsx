import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Fuel, Gauge, Users, Zap, IndianRupee, MapPin, ChevronRight, CheckCircle2, Car } from 'lucide-react';

const VehicleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [bookingLoading, setBookingLoading] = useState(false);

    useEffect(() => {
        const fetchVehicle = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/vehicles/${id}`);
                setVehicle(res.data);
                setSelectedVariant(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchVehicle();
    }, [id]);

    const handleBookTestDrive = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setBookingLoading(true);
        try {
            await api.post('/bookings', { variant_id: selectedVariant.id });
            alert('Test drive booked successfully! Check My Bookings.');
        } catch (err) {
            alert(err.response?.data?.message || 'Error booking test drive');
        } finally {
            setBookingLoading(false);
        }
    };


    if (loading) return (
        <div className="container py-5 text-center">
            <div className="spinner-border text-danger" role="status"></div>
        </div>
    );
    if (!vehicle) return <div className="container py-5 text-center"><h3>Vehicle not found.</h3></div>;

    return (
        <div className="bg-white pb-5">
            {/* Breadcrumb Area */}
            <div className="bg-light py-2 border-bottom">
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 small fw-medium">
                            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-danger">Home</Link></li>
                            <li className="breadcrumb-item"><Link to={`/${vehicle.type_name.toLowerCase()}s`} className="text-decoration-none text-danger">{vehicle.type_name}s</Link></li>
                            <li className="breadcrumb-item"><Link to={`/${vehicle.type_name.toLowerCase()}/${vehicle.brand_name.toLowerCase()}`} className="text-decoration-none text-danger">{vehicle.brand_name}</Link></li>
                            <li className="breadcrumb-item active text-muted" aria-current="page">{vehicle.model_name}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="container mt-4">
                <div className="row g-5">
                    {/* Left Column - Details */}
                    <div className="col-lg-7">
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <span className="badge bg-light text-dark border px-2 py-1 rounded-1 fw-bold">{vehicle.type_name}</span>
                        </div>
                        <h1 className="fw-bolder text-dark mb-2" style={{ fontSize: '2rem' }}>
                            {vehicle.brand_name} {vehicle.model_name} <span className="fw-normal text-muted fs-4">{selectedVariant.fuel_type}</span>
                        </h1>
                        
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <div className="d-flex text-warning">
                                ★★★★☆
                            </div>
                            <span className="text-muted small text-decoration-underline cursor-pointer">124 Reviews</span>
                        </div>

                        <div className="bg-light border rounded p-4 mb-4">
                            <p className="text-muted small fw-medium mb-1">Avg. Ex-Showroom price</p>
                            <h2 className="fw-bold text-dark mb-3 d-flex align-items-center" style={{ fontSize: '2.5rem' }}>
                                ₹ {selectedVariant.price?.toLocaleString()}
                            </h2>
                            <div className="d-flex gap-3">
                                <button className="btn btn-danger px-5 py-3 fw-bold rounded-1 fs-5">Get On-Road Price</button>
                                <button 
                                    onClick={handleBookTestDrive} 
                                    disabled={bookingLoading}
                                    className="btn btn-outline-dark px-4 py-3 fw-bold rounded-1 fs-5 d-flex align-items-center gap-2">
                                    <Car size={20} /> 
                                    {bookingLoading ? 'Booking...' : 'Book Test Drive'}
                                </button>
                            </div>
                            <div className="mt-3 text-muted small d-flex align-items-center gap-1 cursor-pointer">
                                <MapPin size={14} /> <span>Check offers in your city</span> <ChevronRight size={14} />
                            </div>
                        </div>

                        {/* Variants Selection */}
                        <div className="mb-5">
                            <h5 className="fw-bold mb-3 border-bottom pb-2 text-dark">Select Variant</h5>
                            <div className="d-flex flex-wrap gap-2">
                                {vehicle.variants?.map((v) => (
                                    <Link
                                        key={v.id}
                                        to={`/vehicle/${v.id}`}
                                        className={`btn px-4 py-2 border rounded-1 fw-medium transition-all ${parseInt(id) === v.id ? 'btn-outline-danger bg-danger-subtle text-danger' : 'btn-light text-dark hover-primary'
                                            }`}
                                    >
                                        {v.fuel_type}
                                    </Link>
                                ))}
                                {(!vehicle.variants || vehicle.variants.length === 0) && (
                                    <button className="btn btn-outline-danger bg-danger-subtle text-danger px-4 py-2 border rounded-1 fw-medium">
                                        {vehicle.fuel_type} (Base)
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Specs */}
                    <div className="col-lg-5">
                        <div className="border rounded p-4 h-100 bg-white shadow-sm">
                            <h4 className="fw-bold mb-4 border-bottom pb-3">Key Specs of {vehicle.model_name}</h4>
                            
                            <div className="row g-4">
                                <div className="col-6">
                                    <div className="d-flex text-dark mb-1">
                                        <Fuel size={20} className="me-2 text-secondary" />
                                        <span className="text-muted small fw-medium">Fuel Type</span>
                                    </div>
                                    <div className="fw-bold ms-4 ps-2 fs-5">{selectedVariant.fuel_type}</div>
                                </div>
                                <div className="col-6">
                                    <div className="d-flex text-dark mb-1">
                                        <Zap size={20} className="me-2 text-secondary" />
                                        <span className="text-muted small fw-medium">Engine</span>
                                    </div>
                                    <div className="fw-bold ms-4 ps-2 fs-5">{selectedVariant.engine || 'N/A'}</div>
                                </div>
                                <div className="col-6">
                                    <div className="d-flex text-dark mb-1">
                                        <Gauge size={20} className="me-2 text-secondary" />
                                        <span className="text-muted small fw-medium">Mileage</span>
                                    </div>
                                    <div className="fw-bold ms-4 ps-2 fs-5">{selectedVariant.mileage || 'N/A'}</div>
                                </div>
                                <div className="col-6">
                                    <div className="d-flex text-dark mb-1">
                                        <Users size={20} className="me-2 text-secondary" />
                                        <span className="text-muted small fw-medium">Seating</span>
                                    </div>
                                    <div className="fw-bold ms-4 ps-2 fs-5">{selectedVariant.seating_capacity}</div>
                                </div>
                            </div>

                            <div className="mt-5 pt-4 border-top">
                                <h5 className="fw-bold mb-3">Popular Features</h5>
                                <div className="d-flex flex-column gap-2">
                                    <div className="d-flex align-items-center text-dark"><CheckCircle2 size={18} className="text-success me-2" /> Airbags</div>
                                    <div className="d-flex align-items-center text-dark"><CheckCircle2 size={18} className="text-success me-2" /> Anti-Lock Braking System</div>
                                    <div className="d-flex align-items-center text-dark"><CheckCircle2 size={18} className="text-success me-2" /> Touchscreen Display</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetail;
