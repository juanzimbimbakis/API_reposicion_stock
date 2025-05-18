
const express = require('express'); // Importa Express para crear rutas.
const router = express.Router(); // Crea un "router" para definir rutas relacionadas a productos.
const Admin = require('../models/Admin'); // Importa el modelo Admin para interactuar con MongoDB.

// Creamos un admin
router.post('/', async (req, res) => {

    try
    {
        const nuevoAdmin = new Admin(req.body); // Crea un nuevo admin usando los datos recibidos en el body del request.
        await nuevoAdmin.save(); // Guarda el admin en la base de datos.
        res.status(201).json({
            mensaje: 'Admin creado correctamente',
            admin: nuevoAdmin
        }); // Devuelve el admin creado con status 201 (creado).
    } catch(err)
    {
        console.error(err); // Si hay error, lo muestra en consola.
        res.status(500).json({mensaje: 'Error al crear el admin'}); 
    }

});


// GET /admins -> listamos todos los administradores
router.get('/', async (req, res) => { // Define la ruta GET en /admins
    try {
        const admins = await Admin.find(); // Busca todos los admins en la base de datos.
        res.json(admins); // Devuelve el array de admins.
    } catch (err) {
        console.error(err); // Si hay error, lo muestra en consola.
        res.status(500).json({ mensaje: 'Error al obtener los admins' }); // Devuelve error 500 al cliente.
    }
});

// GET /admins/:id -> buscamos admin por id
router.get('/:id', async (req, res) => { // Define la ruta GET en /admins/:id

    try
    {
        const admin = await Admin.findById(req.params.id); // Busca el admin por id en la base de datos.
        if (!admin) 
        {
            return res.status(404).json({mensaje: 'Admin no encontrado'}); // Si no existe, devuelve 404.
        }
            
        res.json(admin); // Devuelve el admin encontrado.
    }
    catch(err)
    {
        console.error(err); // Si hay error, lo muestra en consola.
        res.status(500).json({mensaje: 'Error al obtener el admin'}); // Devuelve error 500 al cliente.
    }

});

// PUT /admins/:id -> Actualizamos un admin por id
router.put('/:id', async (req, res) => { // Define la ruta PUT en /admins/:id
    
try
{

    const admin = await Admin.findById(req.params.id); // Busca el admin por id en la base de datos.
    if (!admin) 
    {
        return res.status(404).json({mensaje: 'Admin no encontrado'}); // Si no existe, devuelve 404.
    }
    // Actualizamos el admin con los nuevos datos
    admin.nombre = req.body.nombre || admin.nombre; // Actualiza el nombre si se proporciona uno nuevo.
    admin.apellido = req.body.apellido || admin.apellido; // Actualiza el apellido si se proporciona uno nuevo.
    admin.email = req.body.email || admin.email; // Actualiza el email si se proporciona uno nuevo.
    admin.password = req.body.password || admin.password; // Actualiza la contraseña si se proporciona una nueva.
    admin.telefono = req.body.telefono || admin.telefono; // Actualiza el telefono si se proporciona uno nuevo.
    admin.direccion = req.body.direccion || admin.direccion; // Actualiza la direccion si se proporciona una nueva.

    await admin.save(); // Guarda el admin actualizado en la base de datos.
    res.status(200).json({
        mensaje: 'Admin actualizado correctamente',
        admin: admin
    }
    ); // Devuelve el admin actualizado con status 200 (ok).

} catch(err)
{
    console.error(err); // Si hay error, lo muestra en consola.
    res.status(500).json({mensaje: 'Error al actualizar el admin'}); // Devuelve error 500 al cliente.
}

});

// DELETE /admins/:id -> Eliminamos un admin por id
router.delete('/:id', async (req, res) => { // Define la ruta DELETE en /admins/:id

    try
    {
        const admin = await Admin.findById(req.params.id); // Busca el admin por id en la base de datos.
        if (!admin) 
        {
            return res.status(404).json({mensaje: 'Admin no encontrado'}); // Si no existe, devuelve 404.
        }
            
        await admin.remove(); // Elimina el admin de la base de datos.
        res.status(200).json({mensaje: 'Admin eliminado correctamente'}); // Devuelve mensaje de éxito con status 200 (ok).
    }
    catch(err)
    {
        console.error(err); // Si hay error, lo muestra en consola.
        res.status(500).json({mensaje: 'Error al eliminar el admin'}); // Devuelve error 500 al cliente.
    }

});

module.exports = router; // Exporta el router para usarlo en otros archivos.