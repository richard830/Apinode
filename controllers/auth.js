const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generarJWT");


const login = async (req, res = response) => {
    const {correo, password} = req.body;

    try {
        //Verificar si el correo existe
        const usuario = await Usuario.findOne({correo});

        if(!usuario){
            return res.status(400).json({
                msj: 'Usuario / password no son correctos'
            })
        }
        
        //Ver si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msj: 'Usuario / password no son correctos estado en false'
            })
        }

        
        //Verificar la contrasseñ
        const validarPassword =  bcryptjs.compareSync(password , usuario.password)
        
        if(!validarPassword){
            return res.status(400).json({
                msj: 'Usuario / password no son correctos password---'
            })
        }


        //Generar el JWT
        const  token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })
        

    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
        
    }
}


module.exports = {
    login
}