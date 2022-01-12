const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


 const usuarioGet = async (req, res= response) => {
   const { limite = 1, desde = 0 } = req.query;
   const query = { estado: true};

  //  const listar = await Usuario.find(query)
  //    .skip(Number(desde))
  //    .limit(Number(limite));
  //  const totalregistros = await Usuario.countDocuments(query); 
   
   const [ totalregistros,usuarios ] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
   ]);

   res.json({
     totalregistros,
     usuarios
    })
  };
  
  const usuarioPut = async(req, res= response) => {
    const { id } = req.params;
    const {_id,password, google, correo, ...resto} = req.body;
    
    if(password){
      //Encriptar la constraseña
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password,salt);
    };

    const actualiza = await Usuario.findByIdAndUpdate(id,resto);
    res.json({
        msg: 'put API - Controlador',
        actualiza
    })
  };

  const usuarioDelete = async (req, res= response) => {
    const { id } = req.params;
    // const elim = await Usuario.findByIdAndRemove(id);
    const elim = await Usuario.findByIdAndUpdate(id,{estado : false});
    res.json(elim);
  };

  const usuarioPost = async(req, res= response) => {
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});
    

    
    //Encriptar la constraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);
    
    // Guardar en BD
    await usuario.save();
    
    res.json({
        usuario
    });
  };

  module.exports = {
    usuarioGet,
    usuarioPut,
    usuarioDelete,
    usuarioPost
  };