const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    products: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: Schema.Types.ObjectId, ref: 'Payment' },
    status: { type: String, enum: ['pending', 'delivered', 'canceled'], default: 'pending' },
    recommendations: { type: String },
    orderDate: { type: Date, default: Date.now },
    deliveryDate: { type: Date }
});

module.exports = mongoose.model('Order', orderSchema);
