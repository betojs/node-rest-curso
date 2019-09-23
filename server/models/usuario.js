const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let rolesValidos={
    values:['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

let usuarioSchema = new Schema ({

    nombre:{
        type: String,
        required:[true, 'El nombre es requerido']
    },
    email:{
        type: String,
        unique: true,
        required:[true, 'El email es requerido']
    },
    password:{
        type: String,
        required:[true, 'la contrasenia es requerido'],

    },
    img:{
        type: String,
        required:false
    },
    rol:{
        default: 'USER_ROLE',
        enum: rolesValidos,
        type: String,
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        default: false,

        type: Boolean,
    }
});


usuarioSchema.methods.toJSON= function (){
    let user = this;
    let userObject =user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, {
    message:'{PATH} Debe de ser unico'
})
module.exports = mongoose.model('Usuario', usuarioSchema);