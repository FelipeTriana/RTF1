const httpStatus = require('http-status');
const newsModel = require('./model');

const getNew = async (id) => {
    return await newsModel.findById(id).exec();
}


const getAllNews = async () => {
    let news = await newsModel.find({}, (err, doc) => {
        if (err) {
            console.log(err);
        }
    }).exec();
    return news.reverse();
};

const createNew = (req, res) => {
    let body = req.body;
    let newNew = new newsModel({
        cuentaUno: body.cuentaUno,
        cuentaDos: body.cuentaDos,
        monto: body.monto,
        //foto: req.file.path,
    }).save().then(() => {
        return res.status(httpStatus.CREATED).send({
            message: `Pago registrado exitosamente.`
        });
    });
};

const updateNew = async (id, body, res) => {
    let event = await newsModel.findByIdAndUpdate(id, body);
    return res.status(httpStatus.OK).send(event);
}

const removeNew = async (id, res) => {
    await newsModel.findOneAndRemove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            return res.status(httpStatus.NOT_FOUND);
        }
    }).then(() => {
        return res.status(httpStatus.OK).send({ message: `Elemento ${id} eliminado correctamente.` });
    });
}

const removeAllNews = async (res) => {
    await newsModel.remove({}, (err) => {
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
    getNew,
    getAllNews,
    createNew,
    updateNew,
    removeNew,
    removeAllNews
};