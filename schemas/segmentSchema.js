const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const segmentSchema = new Schema({
    name: { type: String, required: true, unique: true },
    banner: { type: String }
});

module.exports = mongoose.model('Segment', segmentSchema);
