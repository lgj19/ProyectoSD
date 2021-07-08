require('./database')
const app = require('./app');
const https = require('https');

//Starting the server
https.createServer(app.get('opciones'), app).listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}.`);
});


