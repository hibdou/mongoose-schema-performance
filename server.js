const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User = require('./user.server.model');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/performance_assessment')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Add User Route
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
