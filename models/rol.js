const {Schema, model} = require('mongoose');

const rolSchema = Schema({
    rol: {
        type: String,
        require: [true,'El rol es Obligatorio']
    }
});

module.exports = model('Role',rolSchema);