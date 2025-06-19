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

/*

{
"nombre": "Juan Ignacio",
"apellido": "Zimbimbakis",
"dni": "44700211",
"direccion": "Calle Falsa 123",
"telefono": "3766882298",
"email": "colozim47@gmail.com"
}

*/