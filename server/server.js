const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// routes
const authRoutes = require('./routes/auth');

// middlewares
app.use(morgan('dev'));
app.use(express.json());
// app.use(cors());
app.use(cors({ origin: process.env.CLIENT_URL }));


app.use('/api', authRoutes);
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`API is running on port ${port}`));