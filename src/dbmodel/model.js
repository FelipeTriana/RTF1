const mongoose = require('mongoose');

const schema = {
    cuentaUno: { type: String, required: true },
    cuentaDos: { type: String, required: true },
    nitEmpresaUno: { type: String, required: true },
    nitEmpresaDos: { type: String, required: true },
    responsableLegal: { type: String, required: true },
    monto: { type: String, required: true },
    anomalia : {type:String, required:true}
};

let newsSchema = new mongoose.Schema(schema);
let newsModel = mongoose.model('News', newsSchema);
/* Exportando el modelo de mongoose*/ 
module.exports = newsModel;