const Role = require('../models/rol');
const Usuario = require('../models/usuario');


const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la DB`)
    }
}


const emailExiste = async (correo = '') => {
    //verificar si la correo existe
    const correoExiztent = await Usuario.findOne({ correo });
    if (correoExiztent) {
        throw new Error(`El correo ${correo}, ya esta registrado`)
    }
}

const existeUsuarioPorId = async (id) => {

    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id no existe ${id}`)
    }
}


module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}