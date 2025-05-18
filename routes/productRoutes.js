const express = require('express'); // Importa Express para crear rutas.
const router = express.Router(); // Crea un "router" para definir rutas relacionadas a productos.
const Product = require('../models/Product'); // Importa el modelo Product para interactuar con MongoDB.

// Creamos un producto
router.post('/', async (req, res) => {

    try
    {
        const nuevoProducto = new Product(req.body); // Crea un nuevo producto usando los datos recibidos en el body del request.
        await nuevoProducto.save(); // Guarda el producto en la base de datos.
        res.status(201).json({
            mensaje: 'Producto creado correctamente',
            producto: nuevoProducto
        }); // Devuelve el producto creado con status 201 (creado).
    } catch(err)
    {
        console.error(err); // Si hay error, lo muestra en consola.
        res.status(500).json({mensaje: 'Error al crear el producto'}); 
    }

});

// GET /products -> listamos todos 
router.get('/', async (req, res) => { // Define la ruta GET en /products

    try
    {
        const products = await Product.find(); // Busca todos los productos en la base de datos.
        res.json(products); // Devuelve el array de productos.
    }
    catch(err)
    {
        console.error(err); // Si hay error, lo muestra en consola.
        res.status(500).json({mensaje: 'Error al obtener los productos'}); // Devuelve error 500 al cliente.
    }

});

// GET /products/:id -> buscamos prodeucto por id 
router.get('/:id', async (req, res) => { // Define la ruta GET en /products/:id

    try
    {
        const product = await Product.findById(req.params.id); // Busca el producto por id en la base de datos.
        if (!product) 
        {
            return res.status(404).json({mensaje: 'Producto no encontrado'}); // Si no existe, devuelve 404.
        }
            
        res.json(product); // Devuelve el producto encontrado.
    }
    catch(err)
    {
        console.error(err); // Si hay error, lo muestra en consola.
        res.status(500).json({mensaje: 'Error al obtener el producto'}); // Devuelve error 500 al cliente.
    }

});

// PUT /products/:id -> Actualizamos un producto por id
router.put('/:id', async (req, res) => { // Define la ruta PUT en /products/:id

    try
    {
        const producto = await Product.findById(req.params.id); // Busca el producto por id en la base de datos.
        if (!producto) 
        {
            return res.status(404).json({mensaje: 'Producto no encontrado'}); // Si no existe, devuelve 404.
        }
            
        Object.assign(producto, req.body); 
        /*
            significa:
            Object.assign(destino, fuente) copia todas las propiedades del objeto fuente (en este caso, req.body) al objeto destino (producto).
            Así, actualizas los campos del producto con los datos que recibiste en el body del request.
        */
        await producto.save(); // Guarda el producto actualizado en la base de datos.
        res.json({
            mensaje: 'Producto actualizado correctamente',
            producto
        }); // Devuelve el producto actualizado.
    }
    catch(err)
    {
        console.error(err); // Si hay error, lo muestra en consola.
        res.status(500).json({mensaje: 'Error al actualizar el producto'}); // Devuelve error 500 al cliente.
    }

});

// DELETE /products/:id -> Eliminamos un producto por id
router.delete('/:id', async (req, res) => { // Define la ruta DELETE en /products/:id

    try
    {
        const producto = await Product.findByIdAndDelete(req.params.id); // Busca y elimina el producto por id en la base de datos.
        if (!producto) 
        {
            return res.status(404).json({mensaje: 'Producto no encontrado'}); // Si no existe, devuelve 404.
        }
            
        res.json({
            mensaje: 'Producto eliminado correctamente',
            producto
        }); // Devuelve el producto eliminado.
    }
    catch(err)
    {
        console.error(err); // Si hay error, lo muestra en consola.
        res.status(500).json({mensaje: 'Error al eliminar el producto'}); // Devuelve error 500 al cliente.
    }

});



module.exports = router; // Exporta el router para usarlo en otros archivos.