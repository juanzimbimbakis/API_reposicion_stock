const mongoose = require("mongoose");

const stockMovementSchema = new mongoose.Schema({
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Referencia al modelo Product
    cantidad: Number,
    fecha: { type: Date, default: Date.now },
    tipoMovimiento: { type: String, enum: ['entrada', 'salida'] }, // 'entrada' o 'salida'
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }, // Referencia al modelo Customer
});

const StockMovement = mongoose.model('StockMovement', stockMovementSchema);

module.exports = StockMovement;
