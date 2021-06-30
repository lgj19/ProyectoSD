
//Initializations
const fs = require('fs');
const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const app = express();


//Settings
app.set('port', process.env.PORT || 3001);
app.set('json spaces',2);

const opciones = {
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/cert.pem')
};

app.set('opciones', opciones);

//Middleware

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use("/api", require('./routes/cochesRoutes.js'));
module.exports = app;
