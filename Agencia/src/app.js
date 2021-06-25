
//Initializations
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();


//Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces',2);


//Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use("/api/agencia", require('./routes/AgenciaRoutes.js'));
module.exports = app;
