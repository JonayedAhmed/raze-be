const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true },
    phone: { type: String, required: true, unique: true },
    role: { type: String, enum: ['ADMIN', 'EXECUTIVE', 'USER'], default: 'USER' },
    permissions: [{ type: String }],  // Only for Executive
    createdAt: { type: Date, default: Date.now },
    address: { type: String },
    userImage: { type: String },
    // paymentMethods: [{ type: Schema.Types.ObjectId, ref: 'Payment' }]
});

module.exports = mongoose.model('User', userSchema);
