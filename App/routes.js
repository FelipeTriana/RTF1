const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file , cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
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
 * @route POST /news
 * @group Noticias - Conjunto de servicios sobre el componente /news
 * @param {string} titulo.formData.required - Titulo de la noticia
 * @param {string} responsable.formData - Entidad que genera la noticia
 * @param {string} descripcion.formData - Contenido de la noticia
 * @param {string} enlace.formData - Enlace que lleva a la página completa de la noticia
 * @param {string} duracion.formData - Duración de relevancia de la noticia, en caso de que sea necesario
 * @param {file} foto.formData - Imagen de fondo de la noticia
 * @param {string} tipo.formData.required - Tipo de la noticia, según relevancia
 * @param {string} estado.formData - Estado actual en el que se encuentra la noticia, si es vieja o actual
 * @consumes application/x-www-form-urlencoded
 * @returns {string} CREATED - 201
 */
router.post('/' ,upload.single('foto'), (...args) => {
    controller.create(...args);
})

/**
 * Función GET que retorna todos los registros de noticias.
 * @route GET /news
 * @group Noticias - Conjunto de servicios sobre el componente /news
 * @returns {string} OK - 200
 * @produces application/json
 */
router.route('/').get((...args) => { controller.getAll(...args); });

/**
 * Función DELETE que borra todos los registros de noticias.
 * @route DELETE /news
 * @group Noticias - Conjunto de servicios sobre el componente /news
 * @returns {string} DELETED - 204
 */
router.route('/').delete((...args) => controller.removeAll(...args));


/**
 * Función GET que retorna un registro de noticia específico según su ID.
 * @route GET /news/{id}
 * @param {string} id.path.required - ID de la noticia a consultar
 * @group Noticias - Conjunto de servicios sobre el componente /news
 * @produces application/json
 * @returns {string} OK - 200
 */
router.route('/:id').get((...args) => controller.get(...args));

/**
 * Función PUT modifica el registro indicado según su ID.
 * @route PUT /news/{id}
 * @param {string} id.path.required - ID de la noticia a modificar
 * @param {string} titulo.formData - Titulo de la noticia
 * @param {string} responsable.formData - Entidad que genera la noticia
 * @param {string} descripcion.formData - Contenido de la noticia
 * @param {string} enlace.formData - Enlace que lleva a la página completa de la noticia
 * @param {string} duracion.formData - Duración de relevancia de la noticia, en caso de que sea necesario
 * @param {file} foto.formData - Imagen de fondo de la noticia
 * @param {string} tipo.formData - Tipo de la noticia, según relevancia
 * @param {string} estado.formData - Estado actual en el que se encuentra la noticia, si es vieja o actual
 * @consumes application/x-www-form-urlencoded
 * @group Noticias - Conjunto de servicios sobre el componente /news
 * @returns {string} OK - 200
 */
router.route('/:id').put((...args) => controller.update(...args));

/**
 * Función DELETE elimina el registro de noticias específico según su ID.
 * @route DELETE /news/{id}
 * @param {string} id.path.required - ID de la noticia a eliminar
 * @group Noticias - Conjunto de servicios sobre el componente /news
 * @returns {string} DELETED - 204
 */
router.route('/:id').delete((...args) => controller.remove(...args));

module.exports = router;

