const httpStatus = require('http-status');
const pagoModel = require('../dbmodel/model');

const getPago = async (id) => {
    return await pagoModel.findById(id).exec();
}


const getAllPagos = async () => {
    let pago = await pagoModel.find({}, (err, doc) => {
        if (err) {
            console.log(err);
        }
    }).exec();
    return pago.reverse();
};

const createPago = (req, res) => {
    let body = req.body;

    if (parseInt(body.monto) > 900) {
        var ticket = "El monto excede lo establecido, crear anomalia.";
    } else {
        var ticket = "null"
    }
    console.log(body);
    let newPago = new pagoModel({
        cuentaUno: body.cuentaUno,
        cuentaDos: body.cuentaDos,
        nitEmpresaUno: body.nitEmpresaUno,
        nitEmpresaDos: body.nitEmpresaDos,
        responsableLegal: body.responsableLegal,
        monto: body.monto,
        anomalia: ticket
    }).save().then(() => {

    });
};

const updatePago = async (id, body, res) => {
    let event = await pagoModel.findByIdAndUpdate(id, body);
    return res.status(httpStatus.OK).send(event);
}

const removePago = async (id, res) => {
    await pagoModel.findOneAndRemove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            return res.status(httpStatus.NOT_FOUND);
        }
    }).then(() => {
        return res.status(httpStatus.OK).send({ message: `Elemento ${id} eliminado correctamente.` });
    });
}

const removeAllPagos = async (res) => {
    await pagosModel.remove({}, (err) => {
        if (err) {
            console.log(err);
        }
    }).then(() => {
        return res.status(httpStatus.OK).send({
            message: 'Novedades eliminadas exitosamente'
        })
    });
}

module.exports = {
    getPago,
    getAllPagos,
    createPago,
    updatePago,
    removePago,
    removeAllPagos
};