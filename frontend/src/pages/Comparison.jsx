import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';
import api from '../services/api';
import { io } from 'socket.io-client';
import { GitCompare, Plus, X, IndianRupee, Zap, ChevronRight } from 'lucide-react';

const Comparison = () => {
    const [, setSearchParams] = useSearchParams();
    const [vehicles, setVehicles] = useState([]);

    const [allMetadata, setAllMetadata] = useState({ types: [], brands: [], models: [] });
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const { compareIds, setCompareIds } = useCompare();
    const ids = compareIds.map(String);
    const idsString = ids.join(',');
    
    const socketRef = React.useRef(null);
    const sessionIdRef = React.useRef(null);

    useEffect(() => {
        // Initialize or retrieve a reliable session identifier for sync logic
        let sessionId = localStorage.getItem('compareSessionId');
        if (!sessionId) {
            sessionId = 'session_' + Math.random().toString(36).substring(2, 9);
            localStorage.setItem('compareSessionId', sessionId);
        }
        sessionIdRef.current = sessionId;

        // Establish WebSockets
        socketRef.current = io('http://localhost:5000');
        
        socketRef.current.on('connect', () => {
            socketRef.current.emit('join_session', sessionId);
        });

        socketRef.current.on('compare_updated', (newIds) => {
            setCompareIds(newIds);
        });

        return () => {
            if (socketRef.current) socketRef.current.disconnect();
        };
    }, [setCompareIds]); // Only run once on mount

    // Sync Context -> URL Search Params
    useEffect(() => {
        setSearchParams({ ids: idsString });
    }, [idsString, setSearchParams]);

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const res = await api.get('/vehicles/metadata');
                setAllMetadata(res.data);
            } catch (err) { console.error(err); }
        };
        fetchMetadata();
    }, []);

    useEffect(() => {
        const fetchComparisons = async () => {
            if (idsString.length === 0) {
                setVehicles([]);
                return;
            }
            try {
                const res = await api.get('/vehicles/compare', {
                    params: { ids: idsString }
                });
                setVehicles(res.data);
            } catch (err) { console.error(err); }
        };
        fetchComparisons();
    }, [idsString]); // Listen to idsString directly rather than searchParams

    const removeVehicle = (id) => {
        const newIds = ids.filter(vId => vId !== id.toString());
        setCompareIds(newIds);
        if (socketRef.current) socketRef.current.emit('update_compare', { sessionId: sessionIdRef.current, ids: newIds });
    };

    const addVehicle = (id) => {
        if (ids.includes(id.toString())) return;
        if (ids.length >= 4) {
            alert("Maximum 4 vehicles can be compared at once.");
            return;
        }
        const newIds = [...ids, id.toString()];
        setCompareIds(newIds);
        if (socketRef.current) socketRef.current.emit('update_compare', { sessionId: sessionIdRef.current, ids: newIds });
        setSearchTerm('');
        setShowDropdown(false);
    };

    const filteredModels = allMetadata.models.filter(m => {
        const brand = allMetadata.brands.find(b => b.id === m.brand_id);
        const fullName = `${brand?.name} ${m.name}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    }).slice(0, 5);

    const specRows = [
        { label: 'Type', key: 'type_name' },
        { label: 'Price', key: 'price', format: (val) => `₹ ${val?.toLocaleString()}` },
        { label: 'Engine', key: 'engine' },
        { label: 'Mileage', key: 'mileage' },
        { label: 'Fuel Type', key: 'fuel_type' },
        { label: 'Transmission', key: 'transmission' },
        { label: 'Seating', key: 'seating_capacity', format: (val) => `${val} Seats` }
    ];

    return (
        <div className="bg-light pb-5 min-vh-100">
            {/* Breadcrumbs */}
            <div className="bg-white border-bottom py-2 mb-4">
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 small fw-medium">
                            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-danger">Home</Link></li>
                            <li className="breadcrumb-item active text-muted" aria-current="page">Compare Cars</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="container">
                <div className="mb-4">
                    <h1 className="fw-bolder text-dark mb-2" style={{ fontSize: '1.8rem' }}>
                        Compare Vehicles
                    </h1>
                    <p className="text-muted small">Compare vehicles based on price, mileage, and features to make the right choice.</p>
                </div>

                <div className="row mb-5">
                    <div className="col-lg-6 position-relative">
                        <div className="input-group input-group-lg bg-white border rounded pe-2 align-items-center">
                            <span className="input-group-text bg-transparent border-0 pe-1"><Plus className="text-muted" size={20} /></span>
                            <input
                                type="text"
                                className="form-control border-0 shadow-none fs-6 fw-medium"
                                placeholder="Type to search and add vehicle..."
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); setShowDropdown(true); }}
                                onFocus={() => setShowDropdown(true)}
                            />
                        </div>

                        {showDropdown && searchTerm && (
                            <div className="card position-absolute w-100 mt-1 shadow-sm p-1 border-0 border-top bg-white" style={{ zIndex: 1000 }}>
                                {filteredModels.length > 0 ? (
                                    filteredModels.map(m => (
                                        <button
                                            key={m.id}
                                            onClick={() => addVehicle(m.id)}
                                            className="btn btn-link text-decoration-none text-start w-100 px-3 py-2 text-dark hover-primary d-flex align-items-center border-bottom mb-1"
                                        >
                                            <span className="fw-medium">{allMetadata.brands.find(b => b.id === m.brand_id)?.name} {m.name}</span>
                                        </button>
                                    ))
                                ) : (
                                    <div className="px-3 py-3 text-muted small text-center fw-medium border-top mt-1">No matching vehicles found</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {ids.length > 0 ? (
                    <div className="table-responsive bg-white rounded shadow-sm border overflow-hidden">
                        <table className="table table-borderless mb-0 align-middle">
                            <thead className="bg-white border-bottom">
                                <tr>
                                    <th className="p-4" style={{ width: '220px', verticalAlign: 'bottom' }}>
                                        <span className="text-muted fw-bold d-block mb-2">Basic Information</span>
                                    </th>
                                    {vehicles.map(v => (
                                        <th key={v.id} className="p-4 text-center border-start position-relative">
                                            <button
                                                onClick={() => removeVehicle(v.id)}
                                                className="btn position-absolute top-0 end-0 m-2 p-1 bg-white rounded-circle shadow-sm border hover-primary"
                                                style={{ width: '32px', height: '32px' }}
                                            >
                                                <X size={16} className="text-muted cursor-pointer" />
                                            </button>
                                            <div className="small text-muted fw-bold mb-1 text-uppercase tracking-wider">{v.brand_name}</div>
                                            <div className="fw-bolder text-dark h5 mb-2">{v.model_name}</div>
                                            <div className="small text-danger fw-bold">{v.fuel_type}</div>
                                        </th>
                                    ))}
                                    {[...Array(Math.max(0, 4 - vehicles.length))].map((_, i) => (
                                        <th key={`empty-${i}`} className="p-4 text-center text-muted border-start bg-light" style={{ verticalAlign: 'middle' }}>
                                            <div className="d-flex flex-column align-items-center justify-content-center opacity-50">
                                                <div className="rounded-circle border border-2 border-dashed d-flex align-items-center justify-content-center mb-2" style={{ width: '48px', height: '48px' }}>
                                                    <Plus size={24} />
                                                </div>
                                                <span className="small fw-medium">Add Vehicle</span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {specRows.map((row) => (
                                    <tr key={row.label} className="border-bottom">
                                        <td className="p-4 bg-light fw-bold text-muted small text-uppercase" style={{ width: '220px' }}>{row.label}</td>
                                        {vehicles.map(v => (
                                            <td key={v.id} className="p-4 text-center fw-medium border-start text-dark">
                                                {row.format ? row.format(v[row.key]) : v[row.key]}
                                            </td>
                                        ))}
                                        {[...Array(Math.max(0, 4 - vehicles.length))].map((_, i) => (
                                            <td key={`val-empty-${i}`} className="p-4 text-center text-muted border-start bg-light opacity-50">—</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-5 bg-white rounded border shadow-sm my-4">
                        <GitCompare size={48} className="text-muted opacity-25 mb-3" />
                        <h4 className="fw-bold text-dark">Ready to Compare?</h4>
                        <p className="text-muted small">Select up to 4 vehicles to side-by-side compare details like price, engine, and more.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comparison;
