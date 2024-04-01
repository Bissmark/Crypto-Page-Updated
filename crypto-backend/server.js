const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
const mongoStore = require('connect-mongo');
const passport = require('passport');

require('dotenv').config();
require('./config/database');
require('./config/passport');

const app = express();
const corsOpts = {
    origin: '*',
    credentials: true
};
app.use(cors(corsOpts));

// app.use(express.static(path.join(__dirname, 'build')));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({ 
        mongoUrl: process.env.DATABASE_URL 
    })
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use(logger('dev'));
app.use(express.json());

app.use('/api/users', require('./routes/users'));
app.use('/api', require('./routes/coins'));

// We'll respond to any paths we don't recognise by sending
// the React index.html.
// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

const port = process.env.PORT || 3001;

app.listen(port, function () {
    console.log(`Express running on http://localhost:${ port }`);
});


module.exports = app;
