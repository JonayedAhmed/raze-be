const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    method: { type: String, required: true },  // e.g., 'Credit Card', 'PayPal'
    details: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
