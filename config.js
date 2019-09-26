/**
 * Server configuration
 */
const port = process.env.DEV ? 5000 : 3000;
const morganMode = process.env.Dev ? 'dev' : 'tiny';
 
/**
 * MongoDB credentials
 */
const mongoHost = 'localhost';
const mongoPort = '27017';
const mongoDatabase = 'transactions';
const mongoOpt = {
    user: '', // usuario de la DB
    pass: '', // contraseña de la DB
    dbName: ''
};


/**
 * MongoDB URL. Can be a local or a remote one.
 */
const mongoDB = `mongodb://${mongoHost}:${mongoPort}/${mongoDatabase}`;



module.exports = {
    port,
    morganMode,
    mongoDB,
    mongoOpt
};
