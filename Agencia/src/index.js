require('./database')
const https = require('https');
const app = require('./app');


//Starting the server
https.createServer(app.get('opciones'), app).listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}.`);
})