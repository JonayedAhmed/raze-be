const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const segmentSchema = new Schema({
    name: { type: String, required: true, unique: true },
    banners: [{ type: Schema.Types.ObjectId, ref: 'Banner' }]
});

module.exports = mongoose.model('Segment', segmentSchema);
