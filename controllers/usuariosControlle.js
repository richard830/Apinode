const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
    const query = req.query;
    res.json(
        {
            msj: 'Hola richard get',
            query
        }
    )
}


const usuariosPost = (req, res = response) => {
    const body = req.body;

    res.json(
        {
            msj: 'Hola richard Post',
            body
        }
    )
}
const usuariosPut = (req, res = response) => {
    const { id } = req.params;
    res.json(
        {
            msj: 'Hola richard put',
            id
        }
    )
}
const usuariosDelete = (req, res = response) => {
    res.json(
        {
            msj: 'Hola richard delete'
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