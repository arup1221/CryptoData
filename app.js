const express = require('express');
const statsRoutes = require('./routes/stats');
const connectDB = require('./config/db');

const app = express();

app.use(express.json());

app.use('/api', statsRoutes);

connectDB();

module.exports = app;
