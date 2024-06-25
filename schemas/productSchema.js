const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    segment: { type: Schema.Types.ObjectId, ref: 'Segment' },
    subSegment: { type: Schema.Types.ObjectId, ref: 'SubSegment' },
    inventory: { type: Schema.Types.ObjectId, ref: 'Inventory' },
    images: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
