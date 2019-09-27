const express = require('express');
const server = require('./server');

let app = new express();
server(app);

app.listen(app.get('port'), () => {
    console.log(`The app is listening on the port ${app.get('port')}`);
}); 


//Necesito esto wey: https://github.com/FaztWeb/express-mongodb-crud/blob/master/src/routes/index.js