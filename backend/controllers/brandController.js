const { query } = require('../config/db');

const getBrands = async (req, res, next) => {
    try {
        const { type } = req.query;
        let sql = `
            SELECT b.id, b.name, b.image_url as logo, vt.name as type 
            FROM brands b
            JOIN vehicle_types vt ON b.vehicle_type_id = vt.id
        `;
        const params = [];

        if (type) {
            sql += ' WHERE vt.name = ?';
            params.push(type);
        }

        const brands = await query(sql, params);
        res.json(brands);
    } catch (err) {
        next(err);
    }
};

const updateBrandLogo = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!req.file) {
            return res.status(400).json({ message: 'No image provided' });
        }
        
        const localDbPath = `/public/images/brands/${req.file.filename}`;
        
        await query('UPDATE brands SET image_url = ? WHERE id = ?', [localDbPath, id]);
        
        res.status(200).json({ image_url: localDbPath, message: 'Brand logo updated successfully' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getBrands,
    updateBrandLogo
};
