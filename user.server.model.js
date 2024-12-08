const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Default value
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    age: {
        type: Number,
        min: [18, 'Age must be at least 18'], // Using schema modifiers
        max: [100, 'Age must be below 100'],
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator'], // Restrict values
        default: 'user',
    },
});

// Add a pre-save middleware to update `updatedAt`
UserSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('User', UserSchema);
