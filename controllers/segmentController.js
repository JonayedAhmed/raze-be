const Segment = require('../schemas/segmentSchema');
const { uploadSingle } = require('../utils/helper');

// Create a new segment
exports.createSegment = async (req, res) => {
    try {

        const file = await uploadSingle('banner')(req, res);

        const segmentData = JSON.parse(req.body.segment);

        const newSegment = new Segment({
            name: segmentData.name
        });

        if (file) {
            newSegment.banner = file.path.replace(/\\/g, '/'); // Normalize path
        }

        await newSegment.save();
        res.status(201).json({ message: 'Segment created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the segment', error: error.message });
    }
};

// Get all segments
exports.getAllSegments = async (req, res) => {
    try {
        const segments = await Segment.find();
        res.status(200).json(segments);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching the segments', error: error.message });
    }
};

// Update a segment
exports.updateSegment = async (req, res) => {
    try {
        const { name, banner } = req.body;
        const segment = await Segment.findByIdAndUpdate(req.params.id, { name, banner }, { new: true });
        if (!segment) {
            return res.status(404).json({ message: 'Segment not found' });
        }
        res.status(200).json(segment);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the segment', error: error.message });
    }
};

// Delete a segment
exports.deleteSegment = async (req, res) => {
    try {
        const segment = await Segment.findByIdAndDelete(req.params.id);
        if (!segment) {
            return res.status(404).json({ message: 'Segment not found' });
        }
        res.status(200).json({ message: 'Segment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the segment', error: error.message });
    }
};
