const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    nombre: String,
    direccion: String,
    telefono: String,
    email: String,
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;

/*
{
    "nombre": "Adidas",
    "direccion": "Alemania, Munich",
    "telefono": "3766882298",
    "email": "adidassupplier@gmail.com"
}
*/