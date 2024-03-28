const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

require('dotenv').config();
require('./config/database');

const app = express();
const corsOpts = {
    origin: '*',
    credentials: true,
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type']
};
app.use(cors(corsOpts));

app.use(express.static(path.join(__dirname, 'build')));

app.use(logger('dev'));
app.use(express.json());

app.use('/api/users', require('./routes/users'));
app.use('/api', require('./routes/coins'));

// We'll respond to any paths we don't recognise by sending
// the React index.html.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
    console.log(`Express running on http://localhost:${ port }`);
});


module.exports = app;
