const { Router } = require('express');
const { check } = require('express-validator');
const { usuarioGet, usuarioPut, usuarioDelete, usuarioPost } = require('../controllers/usuario');
const { esRolValido, existeCorreo, existeUsuarioId } = require('../helpers/validadores');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuarioGet);

router.put('/:id',[
    check('id','No es un Id Válido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('rol').custom(esRolValido),
    validarCampos
] ,usuarioPut );

router.post('/',[
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('password','El password debe de ser de al menos 6 caracteres').isLength({min:6}),
    check('correo','El correo no es válido').isEmail(),
    check('correo').custom(existeCorreo),
    check('rol').custom(esRolValido),
    //check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE','USER_ADMIN']),
    validarCampos
] ,usuarioPost );

router.delete('/:id',[
    check('id','No es un Id Válido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos
], usuarioDelete ); 

module.exports = router;