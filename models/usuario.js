const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
       type: String,
       required : [true,'El nombre es obligatorio']
    },
    correo:{
       type: String,
       required : [true,'El correo es obligatorio'],
       unique: true
    },
    password:{
        type: String,
        required : [true,'La clave es obligatorio'],
    },
    img:{
        type: String
    },
    rol:{
        type: String,
        required : true,
        enum : ['ADMIN_ROLE','USER_ROLE','VENTAS_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

//Esto es para excluir algunos campos para que no se muestren cuando se envie el json
//para el caso estamos quitando el __v y el password
UsuarioSchema.methods.toJSON = function(){
    const { __v, password, ...usuario} = this.toObject();
    return usuario;
}

module.exports = model('Usuario',UsuarioSchema);