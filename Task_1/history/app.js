const express = require('express');
const historyRoutes = require('./routes/historyRoutes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', historyRoutes);

module.exports = app;
