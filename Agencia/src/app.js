
//Initializations
const fs = require('fs');
const helmet = require('helmet');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const roles = require('./libs/initSetup')

//Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces',2);

const opciones = {
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/cert.pem')
};

app.set('opciones', opciones);
roles.createRoles(); //Crea los diferentes roles al inicio.

//Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use("/api/agencia", require('./routes/UsuarioRoutes.js'));
app.use("/api/agencia", require('./routes/CocheRoutes.js'));
app.use("/api/agencia", require('./routes/HotelesRoutes.js'));
app.use("/api/agencia", require('./routes/vuelosRoutes.js'));
app.use("/api/agencia/auth", require('./routes/AuthRoutes.js'));
app.use("/api/agencia", require("./routes/PedidoRouter.js"));
app.use("/api/agencia", require("./routes/CuentasRoutes.js"));
module.exports = app;
