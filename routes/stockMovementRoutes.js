
const express = require('express'); // Importa Express para crear rutas.
const router = express.Router(); // Crea un "router" para definir rutas relacionadas a productos.
const StockMovement = require('../models/StockMovement'); // Importa el modelo StockMovement para interactuar con MongoDB.
const Product = require('../models/Product');


router.post('/', async (req, res) => {
    
    try
    {

        // 1. Buscamos el producto
        const producto = await Product.findById(req.body.producto);
        if (!producto)
        {
            return res.status(404).json({mensaje: 'Producto no encontrado'}); // Si no existe, devuelve 404.
        }

        // Validamos si hay suficiente stock de salida...
        if (req.body.tipoMovimiento === 'Salida' && req.body.cantidad > producto.stock)
        {
            return res.status(400).json({mensaje: 'No hay suficiente stock para la salida'}); // Si no existe, devuelve 404.
        }

        // 3. Ahora creamos el movimiento de stock
        const nuevoMovimiento = new StockMovement(req.body); // Crea un nuevo movimiento de stock usando los datos recibidos en el body del request.
        await nuevoMovimiento.save(); // Guarda el movimiento de stock en la base de datos.

        // 4. Actualizamos el stock del producto
        if (req.body.tipoMovimiento === 'Entrada')
        {
            producto.stock += req.body.cantidad; // Aumentamos el stock del producto
        } else if (req.body.tipoMovimiento === 'Salida')
        {
            producto.stock -= req.body.cantidad; // Disminuimos el stock del producto
        }
        await producto.save(); // Guardamos el producto actualizado en la base de datos.

        res.status(201).json({
            mensaje: 'Movimiento de stock creado correctamente y stock actualizado',
            movimiento: nuevoMovimiento
        }); // Devuelve el movimiento de stock creado con status 201 (creado).


    } catch(err)
    {
        console.error(err); // Si hay error, lo muestra en consola.
        res.status(500).json({mensaje: 'Error al crear el movimiento de stock'}); 
    }

});

// GET /stockMovements -> listamos todos los movimientos de stock
router.get('/', async (req, res) => { // Define la ruta GET en /stockMovements
    try {
        const stockMovements = await StockMovement.find(); // Busca todos los movimientos de stock en la base de datos.
        res.json(stockMovements); // Devuelve el array de movimientos de stock.
    } catch (err) {
        console.error(err); // Si hay error, lo muestra en consola.
        res.status(500).json({ mensaje: 'Error al obtener los movimientos de stock' }); // Devuelve error 500 al cliente.
    }
});

// GET /stockMovements/:id -> buscamos movimiento de stock por id
router.get('/:id', async (req, res) => { // Define la ruta GET en /stockMovements/:id

    try
    {
        const movimiento = await StockMovement.findById(req.params.id); // Busca el movimiento de stock por id en la base de datos.
        if (!movimiento) 
        {
            return res.status(404).json({mensaje: 'Movimiento no encontrado'}); // Si no existe, devuelve 404.
        }
            
        res.json(movimiento); // Devuelve el movimiento de stock encontrado.
    }
    catch(err)
    {
        console.error(err); // Si hay error, lo muestra en consola.
        res.status(500).json({mensaje: 'Error al obtener el movimiento de stock'}); // Devuelve error 500 al cliente.
    }

});

// GET /stockMovements/producto/:id -> buscamos movimiento de stock por id de producto
router.get('/product/:id', async (req, res) => { // Define la ruta GET en /stockMovements/producto/:id

    try
    {
        const movimientos = await StockMovement.find({ producto: req.params.id }); // Busca los movimientos de stock por id de producto en la base de datos.
        if (!movimientos) 
        {
            return res.status(404).json({mensaje: 'No se encontró movimientos de stock con este id de producto'}); // Si no existe, devuelve 404.
        }
            
        res.json(movimientos); // Devuelve el movimiento de stock encontrado.
    }
    catch(err)
    {
        console.error(err); // Si hay error, lo muestra en consola.
        res.status(500).json({mensaje: 'Error al obtener los movimientos de stock'}); // Devuelve error 500 al cliente.
    }

});

// GET /stockMovements/cliente/:id -> buscamos movimiento de stock por id de cliente
router.get('/customer/:id', async (req, res) => { // Define la ruta GET en /stockMovements/cliente/:id

    try
    {
        const movimientos = await StockMovement.find({ cliente: req.params.id }); // Busca los movimientos de stock por id de cliente en la base de datos.
        if (!movimientos) 
        {
            return res.status(404).json({mensaje: 'No se encontró movimientos de stock con este id de cliente'}); // Si no existe, devuelve 404.
        }
            
        res.json(movimientos); // Devuelve el movimiento de stock encontrado.
    }
    catch(err)
    {
        console.error(err); // Si hay error, lo muestra en consola.
        res.status(500).json({mensaje: 'Error al obtener los movimientos de stock'}); // Devuelve error 500 al cliente.
    }

});

// GET /stockMovements/supplier/:id -> buscamos movimiento de stock por id de proveedor
router.get('/supplier/:id', async (req, res) => { // Define la ruta GET en /stockMovements/supplier/:id

    try
    {
        const movimientos = await StockMovement.find({ proveedor: req.params.id }); // Busca los movimientos de stock por id de proveedor en la base de datos.
        if (!movimientos) 
        {
            return res.status(404).json({mensaje: 'No se encontró movimientos de stock con este id de proveedor'}); // Si no existe, devuelve 404.
        }
            
        res.json(movimientos); // Devuelve el movimiento de stock encontrado.
    }
    catch(err)
    {
        console.error(err); // Si hay error, lo muestra en consola.
        res.status(500).json({mensaje: 'Error al obtener los movimientos de stock'}); // Devuelve error 500 al cliente.
    }

});

// PUT /stockMovements/:id -> Actualizamos un movimiento de stock por id
router.put('/:id', async (req, res) => { // Define la ruta PUT en /stockMovements/:id

    try
    {
        const movimiento = await StockMovement.findById(req.params.id); // Busca el movimiento de stock por id en la base de datos.
        if (!movimiento) 
        {
            return res.status(404).json({mensaje: 'Movimiento no encontrado'}); // Si no existe, devuelve 404.
        }
            
        await StockMovement.findByIdAndUpdate(req.params.id, req.body); // Actualiza el movimiento de stock con los datos recibidos en el body del request.
        res.json({mensaje: 'Movimiento de stock actualizado correctamente'}); // Devuelve mensaje de éxito.

    } catch(err)
    {
        console.error(err); // Si hay error, lo muestra en consola.
        res.status(500).json({mensaje: 'Error al actualizar el movimiento de stock'}); 
    }

});

// DELETE /stockMovements/:id -> Eliminamos un movimiento de stock por id
router.delete('/:id', async (req, res) => { // Define la ruta DELETE en /stockMovements/:id

    try
    {
        const movimiento = await StockMovement.findById(req.params.id); // Busca el movimiento de stock por id en la base de datos.
        if (!movimiento) 
        {
            return res.status(404).json({mensaje: 'Movimiento no encontrado'}); // Si no existe, devuelve 404.
        }
            
        await StockMovement.findByIdAndDelete(req.params.id); // Elimina el movimiento de stock por id.
        res.json({mensaje: 'Movimiento de stock eliminado correctamente'}); // Devuelve mensaje de éxito.

    } catch(err)
    {
        console.error(err); // Si hay error, lo muestra en consola.
        res.status(500).json({mensaje: 'Error al eliminar el movimiento de stock'}); 
    }

});






module.exports = router; // Exporta el router para usarlo en otros archivos.