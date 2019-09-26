const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('No se pueden imaganes que no sean de extension .PNG o .JPEG'), false)
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

/**
 * Función POST para la creación de un registro en la base de datos.
 */
router.post('/', upload.single('foto'), (...args) => {
    controller.create(...args);
})

/**
 * Función GET que retorna todos los pagos.
 */
router.route('/').get((...args) => { controller.getAll(...args); });

/**
 * Función DELETE que borra todos los registros de pagos.
 */
router.route('/').delete((...args) => controller.removeAll(...args));


/**
 * Función GET que retorna un registro de pago específico según su ID.
 */
router.route('/:id').get((...args) => controller.get(...args));

/**
 * Función PUT modifica el pago indicado según su ID.
 */
router.route('/:id').put((...args) => controller.update(...args));

/**
 * Función DELETE elimina el pago de noticias específico según su ID.
 */
router.route('/:id').delete((...args) => controller.remove(...args));

module.exports = router;