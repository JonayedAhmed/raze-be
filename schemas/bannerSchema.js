const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bannerSchema = new Schema({
    imageUrl: { type: String, required: true },
    link: { type: String },
    position: { type: String, enum: ['home', 'segment', 'subSegment'] },
    segment: { type: Schema.Types.ObjectId, ref: 'Segment' },
    subSegment: { type: Schema.Types.ObjectId, ref: 'SubSegment' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Banner', bannerSchema);
