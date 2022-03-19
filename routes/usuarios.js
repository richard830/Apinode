const { Router } = require('express');
const { usuariosGet, usuariosPost,
     usuariosPut,
     usuariosPath,
     usuariosDelete } = require('../controllers/usuariosControlle');

const router = Router();


router.get('/', usuariosGet );
router.post('/', usuariosPost );
router.put('/:id', usuariosPut );
router.delete('/', usuariosDelete );
router.patch('/', usuariosPath );





module.exports = router;