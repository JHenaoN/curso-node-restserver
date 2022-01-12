const Role  = require('../models/rol');
const Usuario = require('../models/usuario');

//Verificar si es rol válido
const esRolValido = async (rol='') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol){
        throw new Error(`El rol ${rol} no existe en la BD`)
    }
};

// Verificar si el correo existe
const existeCorreo = async(correo) =>{
    const sicorreo =await Usuario.findOne({correo});
    if (sicorreo){
     throw new Error(`El correo ${correo} ya existe en la BD`);
    }
};

// Verificar si el id existe
const existeUsuarioId = async(id) =>{
    const siId = await Usuario.findById(id);
    if (!siId){
     throw new Error(`El id ${id} no existe en la BD`);
    }
};

module.exports ={
    esRolValido,
    existeCorreo,
    existeUsuarioId
}