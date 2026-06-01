import React from 'react';
import { Link } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';
import { Fuel, Gauge, Users, Zap } from 'lucide-react';

const VehicleCard = ({ vehicle, className = "col-12 col-md-6 col-lg-4 mb-4" }) => {
    const { addCompare, compareIds } = useCompare();
    const isCompared = compareIds.includes(vehicle.id) || compareIds.includes(vehicle.id.toString());
    const vehicleImage = vehicle.image_url || `https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop`;

    return (
        <div className={className}>
            <div className="card h-100 carwale-card p-0 overflow-hidden border-0 shadow-sm">
                {/* Image Section */}
                <div className="position-relative overflow-hidden" style={{ height: '200px' }}>
                    <img
                        src={vehicleImage}
                        alt={`${vehicle.brand_name} ${vehicle.model_name}`}
                        className="w-100 h-100 object-fit-cover transition-transform duration-500 hover-scale-110"
                    />
                    <div className="position-absolute top-0 start-0 m-3">
                        <span className="badge bg-primary-container text-white px-2 py-1 rounded-1 small fw-bold">
                            NEW
                        </span>
                    </div>
                </div>

                <div className="card-body p-4 d-flex flex-column">
                    <div className="mb-3">
                        <h3 className="card-title fw-bold text-dark mb-1 fs-5">
                            {vehicle.brand_name} {vehicle.model_name}
                        </h3>
                        <div className="d-flex align-items-baseline gap-2 mb-1">
                            <h4 className="fw-bold fs-4 mb-0" style={{ color: 'var(--primary-color)' }}>
                                ₹ {vehicle.price?.toLocaleString()}
                            </h4>
                            <span className="fs-6 text-muted">onwards</span>
                        </div>
                        <p className="small text-muted mb-0">Avg. Ex-Showroom price</p>
                    </div>

                    <div className="row g-2 mb-4 flex-grow-1 border-top pt-3 mt-1">
                        <div className="col-6 d-flex align-items-center text-secondary small fw-medium">
                            <Fuel size={14} className="me-2 text-muted" /> {vehicle.fuel_type}
                        </div>
                        <div className="col-6 d-flex align-items-center text-secondary small fw-medium">
                            <Zap size={14} className="me-2 text-muted" /> {vehicle.engine || 'N/A'}
                        </div>
                        <div className="col-6 d-flex align-items-center text-secondary small fw-medium">
                            <Gauge size={14} className="me-2 text-muted" /> {vehicle.mileage || 'N/A'}
                        </div>
                        <div className="col-6 d-flex align-items-center text-secondary small fw-medium">
                            <Users size={14} className="me-2 text-muted" /> {vehicle.seating_capacity} Seater
                        </div>
                    </div>

                    <div className="d-flex flex-column gap-2 mt-auto">
                        <Link to={`/vehicle/${vehicle.id}`} className="btn btn-primary w-100 fw-bold">
                            Vehicle Description
                        </Link>
                        <button
                            onClick={(e) => addCompare(vehicle.id.toString(), e)}
                            disabled={isCompared}
                            className={`btn w-100 fw-semibold py-2 border-0 ${isCompared ? 'bg-success-subtle text-success' : 'bg-light text-secondary hover-primary'}`}
                        >
                            {isCompared ? '✓ Added to Compare' : '+ Add to compare'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleCard;
