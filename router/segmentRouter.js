const express = require('express');
const segmentController = require('../controllers/segmentController');
const { verifyToken, isAdmin } = require('../middlewares/auth/authMiddleware');

const router = express.Router();

// Create new segment
router.post('/add', verifyToken, isAdmin, segmentController.createSegment);

// Get all segments
router.get('/all', segmentController.getAllSegments);

// Update a segment
router.put('/:id/update', verifyToken, isAdmin, segmentController.updateSegment);

// Delete a segment
router.delete('/:id/delete', verifyToken, isAdmin, segmentController.deleteSegment);

module.exports = router;
