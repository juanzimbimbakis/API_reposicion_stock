
const express = require('express'); // Importa Express para crear rutas.
const router = express.Router(); // Crea un "router" para definir rutas relacionadas a productos.
const Supplier = require('../models/Supplier'); // Importa el modelo Supplier para interactuar con MongoDB.

// Creamos un proveedor
router.post('/', async (req, res) => {

    try
    {
        const nuevoProveedor = new Supplier(req.body); // Crea un nuevo proveedor usando los datos recibidos en el body del request.
        await nuevoProveedor.save(); // Guarda el proveedor en la base de datos.
        res.status(201).json({
            mensaje: 'Proveedor creado correctamente',
            proveedor: nuevoProveedor
        }); // Devuelve el proveedor creado con status 201 (creado).
    } catch(err)
    {
        console.error(err); // Si hay error, lo muestra en consola.
        res.status(500).json({mensaje: 'Error al crear el proveedor'}); 
    }

});

// GET /suppliers -> listamos todos los proveedores
router.get('/', async (req, res) => { // Define la ruta GET en /suppliers
    try {
        const suppliers = await Supplier.find(); // Busca todos los proveedores en la base de datos.
        res.json(suppliers); // Devuelve el array de proveedores.
    } catch (err) {
        console.error(err); // Si hay error, lo muestra en consola.
        res.status(500).json({ mensaje: 'Error al obtener los proveedores' }); // Devuelve error 500 al cliente.
    }
});

// GET /suppliers/:id -> buscamos proveedor por id
router.get('/:id', async (req, res) => { // Define la ruta GET en /suppliers/:id

    try
    {
        const supplier = await Supplier.findById(req.params.id); // Busca el proveedor por id en la base de datos.
        if (!supplier) 
        {
            return res.status(404).json({mensaje: 'Proveedor no encontrado'}); // Si no existe, devuelve 404.
        }
            
        res.json(supplier); // Devuelve el proveedor encontrado.
    }
    catch(err)
    {
        console.error(err); // Si hay error, lo muestra en consola.
        res.status(500).json({mensaje: 'Error al obtener el proveedor'}); // Devuelve error 500 al cliente.
    }

});

// PUT /suppliers/:id -> Actualizamos un proveedor por id
router.post('/:id', async (req, res) => { // Define la ruta PUT en /suppliers/:id

    try
    {

        const proveedor = await Supplier.findById(req.params.id); // Busca el proveedor por id en la base de datos.
        if (!proveedor) 
        {
            return res.status(404).json({mensaje: 'Proveedor no encontrado'}); // Si no existe, devuelve 404.
        }
            
        await Supplier.findByIdAndUpdate(req.params.id, req.body); // Actualiza el proveedor con los datos recibidos en el body del request.
        res.json({mensaje: 'Proveedor actualizado correctamente'}); // Devuelve mensaje de éxito.

    } catch(err)
    {
        console.error(err); // Si hay error, lo muestra en consola.
        res.status(500).json({mensaje: 'Error al actualizar el proveedor'}); // Devuelve error 500 al cliente.
    }

});

// DELETE /suppliers/:id -> Eliminamos un proveedor por id
router.delete('/:id', async (req, res) => { // Define la ruta DELETE en /suppliers/:id

    try
    {
        const proveedor = await Supplier.findById(req.params.id); // Busca el proveedor por id en la base de datos.
        if (!proveedor) 
        {
            return res.status(404).json({mensaje: 'Proveedor no encontrado'}); // Si no existe, devuelve 404.
        }
            
        await Supplier.findByIdAndDelete(req.params.id); // Elimina el proveedor de la base de datos.
        res.json({mensaje: 'Proveedor eliminado correctamente'}); // Devuelve mensaje de éxito.

    } catch(err)
    {
        console.error(err); // Si hay error, lo muestra en consola.
        res.status(500).json({mensaje: 'Error al eliminar el proveedor'}); // Devuelve error 500 al cliente.
    }

});



module.exports = router; // Exporta el router para usarlo en otros archivos.
