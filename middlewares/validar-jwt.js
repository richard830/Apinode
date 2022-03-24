const { response } = require('express');
const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario');
const Usuario = require('../models/usuario')

const ValidarJWt = async (req = requet, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msj: 'No hay token en la peticion'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //Leer el usuario quw correpond al uid
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msj: 'Token no valido -- usuario no existe en la DB'
            })
        }
        //verificar si el uid tiene estado en true
        if (!usuario.estado) {
            return res.status(401).json({
                msj: 'Token no valido --USUARIO CON ESTADO FALSE'
            })
        }


        req.usuario = usuario;


        next()
    } catch (error) {
        console.log(error);


        res.status(401).json({
            msj: 'Token no valido'
        })
    }

}


module.exports = {
    ValidarJWt
}