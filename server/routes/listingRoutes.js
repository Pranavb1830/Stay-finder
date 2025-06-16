const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', listingController.getAllListings);
router.get('/:id', listingController.getListingById);

router.post('/', protect, listingController.createListing);
router.delete('/:id', protect, listingController.deleteListing);

module.exports = router;