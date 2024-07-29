const SubSegment = require('../schemas/subSegmentSchema');
const { uploadSingle } = require('../utils/helper');

// Create a new sub-segment
exports.createSubSegment = async (req, res) => {
    try {

        const file = await uploadSingle('banner')(req, res);

        const subSegmentData = JSON.parse(req.body.subSegment);

        const newSubSegment = new SubSegment({
            name: subSegmentData?.name,
            segment: subSegmentData?.segment
        });

        if (file) {
            newSubSegment.banner = file.path.replace(/\\/g, '/'); // Normalize path
        }

        await newSubSegment.save();
        res.status(201).json({ message: 'SubSegment created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the SubSegment', error: error.message });
    }
};

// Get all sub-segments
exports.getAllSubSegments = async (req, res) => {
    try {
        const subSegments = await SubSegment.find().populate('segment');
        res.status(200).json(subSegments);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching the sub-segments', error: error.message });
    }
};

// Update a sub-segment
exports.updateSubSegment = async (req, res) => {
    try {
        const { name, segment, banner } = req.body;
        const subSegment = await SubSegment.findByIdAndUpdate(req.params.id, { name, segment, banner }, { new: true }).populate('segment');
        if (!subSegment) {
            return res.status(404).json({ message: 'Sub-segment not found' });
        }
        res.status(200).json(subSegment);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the sub-segment', error: error.message });
    }
};

// Delete a sub-segment
exports.deleteSubSegment = async (req, res) => {
    try {
        const subSegment = await SubSegment.findByIdAndDelete(req.params.id);
        if (!subSegment) {
            return res.status(404).json({ message: 'Sub-segment not found' });
        }
        res.status(200).json({ message: 'Sub-segment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the sub-segment', error: error.message });
    }
};
