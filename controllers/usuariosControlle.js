const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {

    const { limit = 5, desde = 0 } = req.query;

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
            .skip(Number(desde))
            .limit(Number(limit))
    ]);


    res.json(
        {
            total,
            usuarios
        }
    )
}





const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });


    //encritar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    //guardar base de dato
    await usuario.save();



    res.json(
        {
            // msj: 'Hola richard Post',
            usuario
        }
    )
}


const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
        //encritar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario)
}



const usuariosDelete = async(req, res = response) => {
    const {id} = req.params;
   // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
    res.json(
        {
           usuario
        }
    )
}



const usuariosPath = (req, res = response) => {
    res.json(
        {
            msj: 'Hola richard Path'

        }
    )
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPath,

}