const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    tipo: String,
    marca: String,
    modelo: String, 
    precio: Number,
    stock: Number,
    proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' }, // Referencia al modelo Supplier
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;

