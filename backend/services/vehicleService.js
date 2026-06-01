const Vehicle = require('../models/Vehicle');
const { query } = require('../config/db');

const VehicleService = {
    getVehicles: async (queryParams) => {
        return await Vehicle.searchVehicles(queryParams);
    },
    getVehicleDetail: async (id) => {
        const vehicle = await Vehicle.getVehicleById(id);
        if (!vehicle) throw new Error('Vehicle not found');
        const variants = await Vehicle.getVariantsByModel(vehicle.model_id);
        Vehicle.logActivity(null, 'VIEW_VEHICLE', vehicle.id).catch(() => {});
        return { ...vehicle, variants };
    },
    compareVehicles: async (ids) => { 
        if (!ids) throw new Error('No vehicle IDs provided');
        const idList = ids.split(',').map(id => parseInt(id));
        const comparisons = await Vehicle.getComparison(idList);
        idList.forEach(id => Vehicle.logActivity(null, 'COMPARE_VEHICLES', id).catch(() => {}));
        return comparisons;
    },
    getRecommendations: async (userId) => {
        return await Vehicle.getRecommendations(userId);
    },
    getMetadata: async () => {
        const types = await Vehicle.getAllTypes();
        const brands = await query('SELECT * FROM brands');
        const models = await query('SELECT * FROM models');
        return { types, brands, models };
    },
    addVehicle: async (data) => {
        const result = await Vehicle.createVariant(data);
        return { message: 'Vehicle added', id: result.insertId };
    },
    updateVehicle: async (id, data) => {
        await Vehicle.updateVariant(id, data);
        return { message: 'Vehicle updated' };
    },
    deleteVehicle: async (id) => {
        await Vehicle.deleteVariant(id);
        return { message: 'Vehicle deleted' };
    },
    getDashboardStats: async () => {
        return await Vehicle.getStats();
    }
};

module.exports = VehicleService;
