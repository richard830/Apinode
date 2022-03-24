const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { validarCampos } = require('../middlewares/validar-campo');
const { ValidarJWt } = require('../middlewares/validar-jwt');
const {existeCategoriaPorId}= require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();


//Obtener todas las categorias -Publico
router.get('/', obtenerCategorias);



//Obtener todas las categorias id -Publico
router.get('/:id',[
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
], obtenerCategoria);





//Crear categoria - privado - cualquier persona
router.post('/', [
    ValidarJWt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria);



//Actualizar privado cualquier token
router.put('/:id', [
 ValidarJWt,
 check('nombre', 'El nombre es obligatorio').not().isEmpty(),
 check('id').custom(existeCategoriaPorId),
    validarCampos

],actualizarCategoria
);


//Borrar una categorias - Admin
router.delete('/:id',[
    ValidarJWt,
    esAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],borrarCategoria);

module.exports = router;