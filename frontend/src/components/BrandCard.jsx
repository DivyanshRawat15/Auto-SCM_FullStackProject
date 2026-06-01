import React from 'react';
import { Link } from 'react-router-dom';

const BrandCard = ({ brand, category }) => {
  const backendUrl = "http://localhost:5000";
  const imageUrl = brand.logo && brand.logo.startsWith('/public') 
    ? `${backendUrl}${brand.logo}` 
    : brand.logo;

  const getCategoryPath = () => {
    if (category === 'Bike') return 'bikes';
    if (category === 'Heavy-Duty') return 'heavy-duties';
    return 'cars';
  };

  const linkPath = `/${getCategoryPath()}/${brand.name.toLowerCase()}`;

  return (
    <Link to={linkPath} className="text-decoration-none text-dark">
        <div className="brand-grid-item d-flex flex-column align-items-center justify-content-center h-100 p-3 bg-white border rounded hover-primary shadow-sm" style={{ transition: 'all 0.2s', cursor: 'pointer' }}>
          <div className="brand-logo-container mb-2">
            <img
              src={imageUrl}
              alt={brand.name}
              className="brand-logo-img"
            />
          </div>
          <p className="mt-2 text-dark small fw-bold text-center mb-0" style={{ transition: 'color 0.2s' }}>
            {brand.name}
          </p>
        </div>
    </Link>
  );
};

export default BrandCard;
