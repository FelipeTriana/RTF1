const mongoose = require('mongoose');

const schema = {
    cuentaUno: { type: String, required: true },
    cuentaDos: { type: String, required: true },
    monto: { type: String, required: true },
   
};

let newsSchema = new mongoose.Schema(schema);
let newsModel = mongoose.model('News', newsSchema);

module.exports = newsModel;