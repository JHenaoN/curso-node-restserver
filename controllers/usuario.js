const { response } = require('express');

 const usuarioGet = ((req, res= response) => {
    const {saludo,nombre = 'No name',apikey} = req.query;
    res.json({
        msg: 'get API - Controlador',
        saludo,
        nombre,
        apikey
    });
  });
  
  const usuarioPut = ((req, res= response) => {
    const { id } = req.params
    res.json({
        msg: 'put API - Controlador',
        id
    })
  });

  const usuarioDelete = ((req, res= response) => {
    res.json({
        msg: 'delete API - Controlador'
    });
  });

  const usuarioPost = ((req, res= response) => {
    const {nombre,edad} = req.body;
    res.json({
        msg: 'post API - Controlador',
        nombre,
        edad
    });
  });

  module.exports = {
    usuarioGet,
    usuarioPut,
    usuarioDelete,
    usuarioPost
  };