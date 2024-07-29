const express = require('express');
const subSegmentController = require('../controllers/subSegmentController');
const { verifyToken, isAdmin } = require('../middlewares/auth/authMiddleware');

const router = express.Router();

// Create new sub-segment
router.post('/add', verifyToken, isAdmin, subSegmentController.createSubSegment);

// Get all sub-segments
router.get('/all', subSegmentController.getAllSubSegments);

// Update a sub-segment
router.put('/:id/update', verifyToken, isAdmin, subSegmentController.updateSubSegment);

// Delete a sub-segment
router.delete('/:id/delete', verifyToken, isAdmin, subSegmentController.deleteSubSegment);

module.exports = router;
