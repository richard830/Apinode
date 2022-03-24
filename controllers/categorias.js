const { response } = require("express");
const Categoria = require('../models/categoria');

//obtener categoria paginados - total- pppulate
const obtenerCategorias = async (req, res = response) =>{

    const { limit = 5, desde = 0 } = req.query;

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments({ estado: true }),
        Categoria.find({ estado: true })
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limit))
    ]);
    res.json(
        {
            total,
            categorias
        }
    )
}


const obtenerCategoria = async (req , res = response) =>{

    const {id} = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');
    res.json(categoria)
}




const crearCategoria = async(req, res = response) => {

    //se guardar en mayuscula
    const nombre = req.body.nombre.toUpperCase();  

    //ver si existe el nombre en la cateria
    const categoriaDB = await Categoria.findOne({nombre})

    //enviamos el erros si existe categoria
    if(categoriaDB){
        return res.status(400).json({
            msj: `La categoria ${categoriaDB.nombre}, ya existe`
        })
    }

    //generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);
    
    //Guardar en db
    await categoria.save();

    res.status(201).json(categoria);

}



const borrarCategoria = async(req, res = response) =>{
    const { id } = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado:false}, {new: true})



    res.json(categoriaBorrada)

}




const actualizarCategoria = async (req, res = response)=>{
    const { id } = req.params;
    const { estado, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true});
    res.json(categoria);
}

module.exports = {
   
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
    
}