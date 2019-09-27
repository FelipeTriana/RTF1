/**
 * NPM required packages
 */
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

/*Routes */
const routes = require('./routes/routes');

/**
 * Importing configuration variables
 */
const {
    port,
    morganMode,
    mongoDB
} = require('./config');


const server = (app) => {
    mongoose.connect(mongoDB, (err) => {
        if (err) {
            return console.log('Error while connecting to database');
        }
        console.log('Succesfull database connection!');
    });

    app.use('/uploads/', express.static(__dirname + '/uploads'));
    app.set('port', port);
    app.set('views' , path.join(__dirname, 'views'));
    app.set('view engine' , 'ejs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(morgan(morganMode));
    app.use('/', routes);
}

module.exports = server;