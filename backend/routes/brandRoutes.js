const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getBrands, updateBrandLogo } = require('../controllers/brandController');
const verifyToken = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save to the directory we created in Step 1
    cb(null, path.join(__dirname, '../public/images/brands/'));
  },
  filename: (req, file, cb) => {
    // Prevent name collisions by appending a timestamp
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
    cb(null, Date.now() + '-' + cleanName);
  }
});

const upload = multer({ storage });

// Public route to get brands
router.get('/', getBrands);

// Admin route to upload brand logo
router.post('/:id/uploadLogo', verifyToken, authorizeRole('ADMIN'), upload.single('brand_logo'), updateBrandLogo);

module.exports = router;
