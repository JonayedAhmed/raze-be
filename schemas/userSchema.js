const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['Admin', 'Executive', 'Customer'], default: 'Customer' },
    permissions: [{ type: String }],  // Only for Executive
    createdAt: { type: Date, default: Date.now },
    address: { type: String },
    paymentMethods: [{ type: Schema.Types.ObjectId, ref: 'Payment' }]
});

module.exports = mongoose.model('User', userSchema);
