const httpStatus = require('http-status');
const util = require('./util');
const multer = require('multer');               //Multer is a nodejs middleware for handling files, primarily used for uploading files.
const upload = multer({dest: './uploads/'});

const get = async (req, res) => {
    let id = req.params.id;
    let news = await util.getNew(id);
    return res.status(httpStatus.OK).send(news);
}


const getAll = async (req, res) => {
    let events = await util.getAllNews();
    return res.status(httpStatus.OK).send(events);
};

const create = async (req, res,) => {
    util.createNew(req, res);
};

const update = async (req, res) => {
    let body = req.body;
    let id = req.params.id;

    util.updateNew(id, body, res);
}

const remove = async (req, res) => {
    let id = req.params.id;
    util.removeNew(id, res);
}

const removeAll = async (req, res) => {
    util.removeAllNews(res);
}

module.exports = {
    get,
    getAll,
    create,
    update,
    remove,
    removeAll
};