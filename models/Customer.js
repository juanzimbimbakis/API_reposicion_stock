const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    dni: String,
    direccion: String,
    telefono: String,
    email: String,
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;