import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import VehicleCard from '../components/VehicleCard';
import BrandsTabs from '../components/BrandsTabs';
import { Search, Car, Bike, Truck, Filter } from 'lucide-react';

const Home = ({ type: defaultType }) => {
    const { brand } = useParams();
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [type, setType] = useState(defaultType || '');

    const [fuel, setFuel] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [transmission, setTransmission] = useState('');
    const [seating, setSeating] = useState('');

    useEffect(() => {
        setType(defaultType || '');
    }, [defaultType]);

    useEffect(() => {
        const fetchVehicles = async () => {
            setLoading(true);
            try {
                const res = await api.get('/vehicles', {
                    params: {
                        search,
                        type: type === 'All' ? '' : type,
                        brand: brand || '',
                        fuel,
                        minPrice,
                        maxPrice,
                        transmission,
                        seating
                    }
                });
                setVehicles(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchVehicles();
    }, [search, type, brand, fuel, minPrice, maxPrice, transmission, seating]);

    const categoryTabs = [
        { name: 'All', icon: <Filter size={18} /> },
        { name: 'Car', icon: <Car size={18} /> },
        { name: 'Bike', icon: <Bike size={18} /> },
        { name: 'HeavyDuty', icon: <Truck size={18} /> },
    ];

    return (
        <>
            <div className="container-fluid p-0 mb-5">
                <div className="hero-banner w-100">
                    <div className="text-center text-white" style={{ zIndex: 1, paddingBottom: '100px' }}>
                        <h1 className="display-4 fw-800 mb-2 text-shadow tracking-tight">FIND THE RIGHT VEHICLE</h1>
                        <p className="fs-5 text-shadow opacity-90 fw-medium">Compare prices, features and reviews of all models</p>
                    </div>

                    <div className="floating-search-card">
                        {/* Category Switcher Tabs */}
                        <div className="type-switch d-flex w-100">
                            {categoryTabs.map((tab) => (
                                <button
                                    key={tab.name}
                                    onClick={() => setType(tab.name === 'All' ? '' : tab.name)}
                                    className={`type-switch-btn flex-grow-1 justify-content-center ${(type || '') === (tab.name === 'All' ? '' : tab.name) ? 'active' : ''}`}
                                >
                                    {tab.icon}
                                    <span className="d-none d-sm-inline">
                                        {tab.name === 'HeavyDuty' ? 'Heavy Duty' : (tab.name === 'All' ? 'All Vehicles' : `New ${tab.name}s`)}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <div className="p-4 p-md-5">
                            {/* Radio selection */}
                            <div className="d-flex gap-4 mb-4">
                                <div className="form-check custom-radio">
                                    <input className="form-check-input" type="radio" name="searchType" id="byBudget" defaultChecked />
                                    <label className="form-check-label fw-600 text-dark" htmlFor="byBudget">By Budget</label>
                                </div>
                                <div className="form-check custom-radio">
                                    <input className="form-check-input" type="radio" name="searchType" id="byBrand" />
                                    <label className="form-check-label fw-600 text-muted" htmlFor="byBrand">By Brand</label>
                                </div>
                            </div>

                            {/* Main Search Input */}
                            <div className="d-flex mb-3 gap-0 flex-column flex-md-row shadow-sm rounded-1 overflow-hidden">
                                <div className="position-relative flex-grow-1">
                                    <div className="position-absolute top-50 translate-middle-y ms-3">
                                        <Search size={22} className="text-muted" />
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg ps-5 border-0 rounded-0 fw-medium py-3"
                                        placeholder={`Type to select ${type || 'vehicle'} model or brand...`}
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        style={{ fontSize: '1.15rem' }}
                                    />
                                </div>
                                <button className="btn btn-primary px-5 py-3 rounded-0 fw-bold fs-5">
                                    SEARCH
                                </button>
                            </div>

                            {/* Quick Links */}
                            <div className="d-flex align-items-center flex-wrap gap-2 mt-4">
                                <span className="text-muted small fw-bold text-uppercase tracking-wider">Trending:</span>
                                <span className="badge bg-light text-dark border py-2 px-3 cursor-pointer hover-primary transition-all">Thar ROXX</span>
                                <span className="badge bg-light text-dark border py-2 px-3 cursor-pointer hover-primary transition-all">Swift</span>
                                <span className="badge bg-light text-dark border py-2 px-3 cursor-pointer hover-primary transition-all">Creta</span>
                                <span className="badge bg-light text-dark border py-2 px-3 cursor-pointer hover-primary transition-all">Classic 350</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-4">
                <BrandsTabs initialType={defaultType} />

                <div className="row mt-4">
                    {/* Sticky Sidebar Filters */}
                    <div className="col-lg-3 mb-4">
                        <div className="sticky-top pt-2" style={{ top: '80px', zIndex: 10 }}>
                            <div className="card border-0 shadow-sm p-4 animate-in slide-right" style={{ borderRadius: 'var(--radius-lg)' }}>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="fw-800 mb-0 d-flex align-items-center gap-2 fs-6">
                                        <Filter size={18} className="text-primary" /> FILTERS
                                    </h5>
                                    <button onClick={() => { setFuel(''); setMinPrice(''); setMaxPrice(''); setTransmission(''); setSeating(''); }} className="btn btn-link text-danger p-0 text-decoration-none small fw-bold" style={{ fontSize: '11px' }}>
                                        RESET
                                    </button>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label small fw-800 text-muted text-uppercase tracking-wider" style={{ fontSize: '10px' }}>Fuel Type</label>
                                    <select className="form-select border-0 bg-light py-2 fw-medium" style={{ fontSize: '14px' }} value={fuel} onChange={e => setFuel(e.target.value)}>
                                        <option value="">All Fuels</option>
                                        <option value="Petrol">Petrol</option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="Electric">Electric</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label small fw-800 text-muted text-uppercase tracking-wider" style={{ fontSize: '10px' }}>Transmission</label>
                                    <select className="form-select border-0 bg-light py-2 fw-medium" style={{ fontSize: '14px' }} value={transmission} onChange={e => setTransmission(e.target.value)}>
                                        <option value="">All Types</option>
                                        <option value="Manual">Manual</option>
                                        <option value="Automatic">Automatic</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label small fw-800 text-muted text-uppercase tracking-wider" style={{ fontSize: '10px' }}>Price Range</label>
                                    <div className="d-flex gap-2">
                                        <input type="number" className="form-control border-0 bg-light py-2 fw-medium" style={{ fontSize: '14px' }} placeholder="Min ₹" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                                        <input type="number" className="form-control border-0 bg-light py-2 fw-medium" style={{ fontSize: '14px' }} placeholder="Max ₹" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
                                    </div>
                                </div>

                                <div>
                                    <label className="form-label small fw-800 text-muted text-uppercase tracking-wider" style={{ fontSize: '10px' }}>Seating Capacity</label>
                                    <input type="number" className="form-control border-0 bg-light py-2 fw-medium" style={{ fontSize: '14px' }} placeholder="Min seats" value={seating} onChange={e => setSeating(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vehicle Feed */}
                    <div className="col-lg-9">
                        {loading ? (
                            <div className="row g-4">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="col-md-6 col-lg-4">
                                        <div className="card h-100 p-0 overflow-hidden border-0 bg-white shadow-sm placeholder-glow">
                                            <div className="card-body p-4 d-flex flex-column gap-3">
                                                <div className="mb-2">
                                                    <span className="placeholder col-8 rounded mb-2 h4"></span>
                                                    <span className="placeholder col-5 rounded mb-1 h5"></span>
                                                    <span className="placeholder col-4 rounded small d-block"></span>
                                                </div>
                                                <div className="row g-3 border-top pt-3 mt-1">
                                                    <div className="col-6"><span className="placeholder col-10 rounded"></span></div>
                                                    <div className="col-6"><span className="placeholder col-10 rounded"></span></div>
                                                    <div className="col-6"><span className="placeholder col-10 rounded"></span></div>
                                                    <div className="col-6"><span className="placeholder col-10 rounded"></span></div>
                                                </div>
                                                <div className="mt-auto d-flex flex-column gap-2">
                                                    <span className="placeholder col-12 rounded" style={{ height: '40px' }}></span>
                                                    <span className="placeholder col-12 rounded" style={{ height: '40px' }}></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : vehicles.length > 0 ? (
                            <div className="row g-4">
                                {vehicles.map((v) => (
                                    <VehicleCard key={v.id} vehicle={v} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-5 rounded-4 bg-white border mt-0">
                                <h3 className="fw-bold mb-2">No vehicles found</h3>
                                <p className="text-muted">Try adjusting your search or filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
export default Home;
