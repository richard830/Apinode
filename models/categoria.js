const { Schema, model } = require('mongoose');

const Categoriaschema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado:{
        type:Boolean,
        default:true,
        require: true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref: 'Usuario',
        require:true
    }
});


//NO MOSTRAR LA VERSION NI EL ESTADO EN LA BASE DE DATOS
Categoriaschema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
   
    return data;
}
module.exports = model('Categoria', Categoriaschema);
