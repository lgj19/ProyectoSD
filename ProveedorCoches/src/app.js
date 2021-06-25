
//Initializations
const express = require('express');
const morgan = require('morgan');

const app = express();


//Settings
app.set('port', process.env.PORT || 3001);
app.set('json spaces',2);

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use("/api", require('./routes/cochesRoutes.js'));
module.exports = app;
