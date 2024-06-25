const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subSegmentSchema = new Schema({
    name: { type: String, required: true },
    segment: { type: Schema.Types.ObjectId, ref: 'Segment' },
    banners: [{ type: Schema.Types.ObjectId, ref: 'Banner' }]
});

module.exports = mongoose.model('SubSegment', subSegmentSchema);
