
//Initializations
const fs = require('fs');
const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const app = express();


//Settings
app.set('port', process.env.HTTPS_PORT || 3004);
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
app.use("/api/Banco", require('./routes/cuentasRoutes.js'));


module.exports = app;
