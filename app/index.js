const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('../config/routers');
const app = express();

/** Install request logger */
app.use(morgan('dev'));

/** Install JSON request parser */
app.use(express.json());

app.use(cors());

/** Install Router */
app.use(router);

module.exports = app;
