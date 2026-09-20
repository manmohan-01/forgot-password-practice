require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const passwordRoutes = require('./routes/password');

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use('/api/auth', authRoutes);
app.use('/api/password', passwordRoutes);

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/practice')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server running on http://localhost:5000'));
  })
  .catch((err) => console.error('MongoDB connection failed:', err.message));

