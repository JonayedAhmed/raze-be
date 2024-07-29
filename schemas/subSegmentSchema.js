const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subSegmentSchema = new Schema({
    name: { type: String, required: true },
    segment: { type: Schema.Types.ObjectId, ref: 'Segment', required: true },
    banner: { type: String }
});

module.exports = mongoose.model('SubSegment', subSegmentSchema);
