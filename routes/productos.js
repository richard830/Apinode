const { Router } = require('express');
const { check } = require('express-validator');
const { 
    
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto} = require('../controllers/productos');

const { validarCampos } = require('../middlewares/validar-campo');
const { ValidarJWt } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const {existeCategoriaPorId, existeProductosPorId}= require('../helpers/db-validators');


const router = Router();


//Obtener todas las categorias -Publico
router.get('/', obtenerProductos);



//Obtener todas las categorias id -Publico
router.get('/:id',[
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductosPorId),
    validarCampos,
],obtenerProducto);





//Crear categoria - privado - cualquier persona
router.post('/', [
    ValidarJWt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de mongo valido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
],crearProducto);



//Actualizar privado cualquier token
router.put('/:id', [
 ValidarJWt,
 //check('categoria', 'No es un id de mongo valido').isMongoId(),

 check('id').custom(existeProductosPorId),
    validarCampos

],actualizarProducto
);


//Borrar una categorias - Admin
router.delete('/:id',[
    ValidarJWt,
    esAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductosPorId),
    validarCampos
],borrarProducto);

module.exports = router;