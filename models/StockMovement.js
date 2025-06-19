const mongoose = require("mongoose");

const stockMovementSchema = new mongoose.Schema({
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Referencia al modelo Product
    cantidad: Number,
    fecha: { type: Date, default: Date.now },
    tipoMovimiento: { type: String, enum: ['Entrada', 'Salida'] }, // 'entrada' o 'salida'
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }, // Referencia al modelo Customer
    proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' } // Referencia al modelo Supplier
});

const StockMovement = mongoose.model('StockMovement', stockMovementSchema);

module.exports = StockMovement;

/*

    Esto para retirar stock

{
"producto": "ID_PRODUCTO",
"cantidad": 3,
"tipoMovimiento": "Salida",
"cliente": "ID_CLIENTE"
}



// Esto para ingresar stock

{
  "producto": "ID_PRODUCTO",
  "cantidad": 5,
  "tipoMovimiento": "Entrada",
  "proveedor": "ID_DEL_PROVEEDOR"
}


*/
