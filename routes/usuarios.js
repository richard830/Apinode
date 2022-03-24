const { Router } = require('express');
const { check } = require('express-validator');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { validarCampos, } = require('../middlewares/validar-campo');
const { ValidarJWt } = require('../middlewares/validar-jwt');
const { esAdminRole, tieneRol } = require('../middlewares/validar-roles');

const {
     usuariosGet,
     usuariosPost,
     usuariosPut,
     usuariosPath,
     usuariosDelete
} = require('../controllers/usuariosControlle');




const router = Router();



router.get('/', usuariosGet);


router.post('/', [
     check('nombre', 'El nombre es obligatorio').not().isEmail(),
     check('password', 'El password debe de ser mas de 6 letras').isLength({ min: 6 }),
     check('correo', 'El correo no es valido').isEmail(),
     check('correo').custom(emailExiste),
     // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),

     check('rol').custom(esRolValido),

     validarCampos
], usuariosPost);



router.put('/:id', [
     check('id', 'No es un id valido').isMongoId(),
     check('id').custom(existeUsuarioPorId),
     check('rol').custom(esRolValido),
     validarCampos
], usuariosPut);




router.delete('/:id',[
     ValidarJWt,
     //esAdminRole, //solo si es un rol de administrador
     
     tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
     check('id', 'No es un id valido').isMongoId(),
     check('id').custom(existeUsuarioPorId),
     validarCampos
], usuariosDelete);
router.patch('/', usuariosPath);





module.exports = router;