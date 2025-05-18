const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    direccion: String,
    telefono: String,
    email: String,
    password: String
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;

/*
{
    "nombre": String,
    "apellido": String,
    "direccion": String,
    "telefono": String,
    "email": String,
    "password": String
}
*/