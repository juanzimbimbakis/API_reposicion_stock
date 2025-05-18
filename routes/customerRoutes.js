const express = require('express'); // Importa Express para crear rutas.
const router = express.Router(); // Crea un "router" para definir rutas relacionadas a productos.
const Customer = require('../models/Customer'); // Importa el modelo Product para interactuar con MongoDB.

// Creamos un cliente
router.post('/', async (req, res) => {

    try
    {
        const nuevoCliente = new Customer(req.body); // Crea un nuevo cliente usando los datos recibidos en el body del request.
        await nuevoCliente.save(); // Guarda el cliente en la base de datos.
        res.status(201).json({
            mensaje: 'Cliente creado correctamente',
            cliente: nuevoCliente
        }); // Devuelve el cliente creado con status 201 (creado).
    } catch(err)
    {
        console.error(err); // Si hay error, lo muestra en consola.
        res.status(500).json({mensaje: 'Error al crear el cliente'}); 
    }

});

// GET /customers -> listamos todos los clientes
router.get('/', async (req, res) => { // Define la ruta GET en /customers
    try {
        const customers = await Customer.find(); // Busca todos los clientes en la base de datos.
        res.json(customers); // Devuelve el array de clientes.
    } catch (err) {
        console.error(err); // Si hay error, lo muestra en consola.
        res.status(500).json({ mensaje: 'Error al obtener los clientes' }); // Devuelve error 500 al cliente.
    }
});

// GET /customers/:id -> buscamos cliente por id
router.get('/:id', async (req, res) => { // Define la ruta GET en /customers/:id

    try
    {
        const customer = await Customer.findById(req.params.id); // Busca el cliente por id en la base de datos.
        if (!customer) 
        {
            return res.status(404).json({mensaje: 'Cliente no encontrado'}); // Si no existe, devuelve 404.
        }
            
        res.json(customer); // Devuelve el cliente encontrado.
    }
    catch(err)
    {
        console.error(err); // Si hay error, lo muestra en consola.
        res.status(500).json({mensaje: 'Error al obtener el cliente'}); // Devuelve error 500 al cliente.
    }

});

// PUT /customers/:id -> Actualizamos un cliente por id
router.put('/:id', async (req, res) => { // Define la ruta PUT en /customers/:id

    try
    {

        const cliente = await Customer.findById(req.params.id); // Busca el cliente por id en la base de datos.
        if (!cliente)
        {
            return res.status(404).json({mensaje: 'Cliente no encontrado'}); // Si no existe, devuelve 404.
        }
        // Actualiza el cliente con los nuevos datos
        cliente.nombre = req.body.nombre || cliente.nombre; // Actualiza el nombre del cliente.
        cliente.apellido = req.body.apellido || cliente.apellido; // Actualiza el apellido del cliente.
        cliente.direccion = req.body.direccion || cliente.direccion; // Actualiza la direccion del cliente.
        cliente.telefono = req.body.telefono || cliente.telefono; // Actualiza el telefono del cliente.
        cliente.email = req.body.email || cliente.email; // Actualiza el email del cliente.
        cliente.dni = req.body.dni || cliente.dni; // Actualiza el dni del cliente.

        await cliente.save(); // Guarda el cliente actualizado en la base de datos.
        res.json({
            mensaje: 'Cliente actualizado correctamente',
            cliente: cliente
        }); // Devuelve el cliente actualizado.
        
    } catch(err)
    {
        console.error(err); // Si hay error, lo muestra en consola.
        res.status(500).json({mensaje: 'Error al actualizar el cliente'}); // Devuelve error 500 al cliente.
    }

});

module.exports = router; // Exporta el router para usarlo en otros archivos.