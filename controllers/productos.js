const { response } = require("express");
const Producto = require('../models/productos');

//obtener categoria paginados - total- pppulate
const obtenerProductos = async (req, res = response) =>{

    const { limit = 5, desde = 0 } = req.query;

    const [total, producto] = await Promise.all([
        Producto.countDocuments({ estado: true }),
        Producto.find({ estado: true })
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limit))
    ]);
    res.json(
        {
            total,
            producto
        }
    )
}

const obtenerProducto = async (req , res = response) =>{

    const {id} = req.params;
    const producto = await Producto.findById(id)
    .populate('usuario', 'nombre')
    .populate('categoria', 'nombre');
    res.json(producto)
}

const crearProducto = async(req, res = response) => {

    //se guardar en mayuscula
    const {estado, usuario, ...body} = req.body;  

    //ver si existe el nombre en la cateria
    const productoDB = await Producto.findOne({nombre: body.nombre})

    //enviamos el erros si existe categoria
    if(productoDB){
        return res.status(400).json({
            msj: `La producto ${productoDB.nombre}, ya existe`
        })
    }

    //generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto(data);
    
    //Guardar en db
    await producto.save();

    res.status(201).json(producto);

}

const actualizarProducto = async (req, res = response)=>{
    const { id } = req.params;
    const { estado, usuario, ...data} = req.body;

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase(); //en mayuscula
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true});
    res.json(producto);
}


const borrarProducto = async(req, res = response) =>{
    const { id } = req.params;
    const productoBorrada = await Producto.findByIdAndUpdate(id, {estado:false}, {new: true})



    res.json(productoBorrada)

}






module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto

}