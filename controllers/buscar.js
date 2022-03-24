const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Productos = require('../models/productos');

const coleccionesPermitidas = [
    'categorias',
    'usuarios',
    'productos',
    'roles'
]


const buscarUsuarios = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);
    //si es por id
    if (esMongoId) {
        const usuario = await Usuario.findById(termino);
        return res.json(
            {
                results: (usuario) ? [usuario] : []
            }
        )
    }


    const minuscul = new RegExp(termino, 'i');
    const usuario = await Usuario.find({
        $or: [{ nombre: minuscul }, { correo: minuscul }],
        $and: [{ estado: true }]
    });

    res.json({
        results: usuario
    })

    //Nota tambien se puede ver la cantidad que hay con el count 
}



const buscarCategorias = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);
    //si es por id
    if (esMongoId) {
        const categoria = await Categoria.findById(termino);
        return res.json(
            {
                results: (categoria) ? [categoria] : []
            }
        )
    }


    const minuscul = new RegExp(termino, 'i');
    const categoria = await Categoria.find({ nombre: minuscul, estado: true });

    res.json({
        results: categoria
    })

    //Nota tambien se puede ver la cantidad que hay con el count 
}



const buscarProductos = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);
    //si es por id
    if (esMongoId) {
        const productos = await Productos.findById(termino)
                                .populate('categoria', 'nombre');
        return res.json(
            {
                results: (productos) ? [productos] : []
            }
        )
    }


    const minuscul = new RegExp(termino, 'i');
    const producto = await Productos.find({ nombre: minuscul, estado: true })
                            .populate('categoria', 'nombre');

    res.json({
        results: producto
    })

    //Nota tambien se puede ver la cantidad que hay con el count 
}




const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        res.status(400).json({
            msj: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }


    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res)
            break;
        case 'categorias':
            buscarCategorias(termino, res)
            break;
        case 'productos':
            buscarProductos(termino, res)
            break;

        default:
            res.status(500).json({
                msj: 'Se me olvido hacer estas busqueda'
            })
    }


}


module.exports = {
    buscar
}