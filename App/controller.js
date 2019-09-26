const httpStatus = require('http-status');
const util = require('./util');
const multer = require('multer'); //Multer is a nodejs middleware for handling files, primarily used for uploading files.
const upload = multer({ dest: './uploads/' });

const get = async(req, res) => {
    let id = req.params.id;
    let pagos = await util.getPago(id);
    return res.status(httpStatus.OK).send(news);
}


const getAll = async(req, res) => {
    let events = await util.getAllPagos();
    return res.status(httpStatus.OK).send(events);
};

const create = async(req, res, ) => {
    util.createPago(req, res);
};

const update = async(req, res) => {
    let body = req.body;
    let id = req.params.id;

    util.updatePago(id, body, res);
}

const remove = async(req, res) => {
    let id = req.params.id;
    util.removePago(id, res);
}

const removeAll = async(req, res) => {
    util.removeAllPagos(res);
}

module.exports = {
    get,
    getAll,
    create,
    update,
    remove,
    removeAll
};