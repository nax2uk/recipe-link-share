const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();


mongoose.connect(process.env.DATABASE_CLOUD, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log('db connected'))
    .catch(error => console.error(error));

// routes
const apiRouter = require('./routes/api');


const { errInvalidPaths } = require("./controllers/error");

// middlewares
app.use(morgan('dev'));
app.use(express.json());
// app.use(cors());
app.use(cors({ origin: process.env.CLIENT_URL }));


app.use('/api', apiRouter);


//error-controller for invalid paths
app.all("/*", errInvalidPaths);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`API is running on port ${port}`));


module.exports = app;