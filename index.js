require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a MongoDB Atlas');
    app.listen(8081, () => {
      console.log('Servidor corriendo en puerto 8081 ...!!!');
    });
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
  });


  // Importamos la libreria express 
// const express = require('express');

// Creamos una instancia de express 
// const app = express();

// Le decimos que puede interpretar JSON en las peticiones 
app.use(express.json());

// Creamos un array para simular una BD 

let productos = 
[

{id: 1, tipo: 'Palo', marca: 'Osaka', modelo: 'low bow 100% carbono', precio: 500000},
{id: 2, tipo: 'Palo', marca: 'Adidas', modelo: 'adidas 250mm low', precio: 470000},
{id: 3, tipo: 'Palo', marca: 'Grays', modelo: 'Grays 80000', precio: 650000}

];

// const uri = "mongodb+srv://juanzimbi:lebronjames@api-hockey.zkph8t5.mongodb.net/?retryWrites=true&w=majority&appName=api-hockey";

// juanzimbi
// lebronjames

/*
mongodb+srv://juanzimbi:lebronjames@api-hockey.zkph8t5.mongodb.net/?retryWrites=true&w=majority&appName=api-hockey
*/

/*

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://juanzimbi:lebronjames@api-hockey.zkph8t5.mongodb.net/?retryWrites=true&w=majority&appName=api-hockey";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

*/


const productRoutes = require('./routes/productRoutes');
// Usamos las rutas modularizadas 
app.use('/products', productRoutes);

const adminRoutes = require('./routes/AdminRoutes');
// Usamos las rutas modularizadas
app.use('/admins', adminRoutes);

const customerRoutes = require('./routes/CustomerRoutes');
// Usamos las rutas modularizadas
app.use('/customers', customerRoutes);

const supplierRoutes = require('./routes/supplierRoutes');
// Usamos las rutas modularizadas
app.use('/suppliers', supplierRoutes);




app.get('/', (req, res) => {

    res.send('Mi primer server :))))');

});


// Hacemos un GET: GET /products -> listamos todos los productos
app.get('/products', (req, res) => {
    
    res.json(productos);

});

// Hacemos otro GET: GET /products/:id -> devuelve un producto por id
app.get('/products/:id', function(req, res) {
    
    const {id} = req.params;
    const producto = productos.find(p => p.id == id);

    if (!producto)
    {
        return res.status(404).json({ mensaje: 'Producto no encontrado'});
    }

    res.json(producto);

});

// Ahora hacemos un POST: POST /products -> agregamos un producto nuevo 
app.post('/products', (req, res) => {
    
    const nuevoProducto = req.body;

    nuevoProducto.id = productos.length + 1;
    productos.push(nuevoProducto);

    res.status(201).json(nuevoProducto);

});

// Hacemos un DELETE: DELETE /products/:id -> eliminamos un producto por id 
app.delete('/products/:id', function(req, res) {
    
    const {id} = req.params;
    productos = productos.filter(p => p.id != id);

    res.status(204).send(); // 204: no existe el contenido 

});

// Levantamos el servidor en el puerto 3000 
/*
app.listen(8081, () => {

    console.log('Servidor corriendo en puerto 8081 ...!!!');

});
*/


