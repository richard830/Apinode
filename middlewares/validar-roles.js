const { response } = require("express");
const { Result } = require("express-validator");
const rol = require("../models/rol");





const esAdminRole = (req, res = response, next)=> {

if(!req.usuario){
    return res.status(500).json({
        msj: 'Se requiere verificar el rol sin validar el token'
    });
}
const {rol, nombre} = req.usuario;

if(rol !== 'ADMIN_ROLE'){
    return res.status(401).json({
        msj: `${nombre} no es un administrador -- no puede hacer esto`
    })
}

    
    next();
}

const tieneRol = ( ...roles) =>{
 return (req, res = response, next) =>{

    if(!req.usuario){
        return res.status(500).json({
            msj: 'Se requiere verificar el rol sin validar el token'
        });
    }

    if(!roles.includes(req.usuario.rol)){
        return res.status(401).json({
            msj: `El servicio requiere uno de estos roles ${roles}`
        })
    }


    next();
 }
}



module.exports ={
    esAdminRole,
    tieneRol
}