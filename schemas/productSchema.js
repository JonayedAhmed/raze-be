const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountedPrice: { type: Number },
    segment: { type: Schema.Types.ObjectId, ref: 'Segment', required: true },
    subSegment: { type: Schema.Types.ObjectId, ref: 'SubSegment', required: true },
    sizes: [{
        size: { type: String, required: true },
        quantity: { type: Number, required: true, default: 0 }
    }],
    threshold: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    images: [{ type: String }],
});

module.exports = mongoose.model('Product', productSchema);
