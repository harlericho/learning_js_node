// * Inicializacion de express
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// * Variables de entorno
const port = process.env.PORT || 9000;
// * Obtener los datos del json
const data = require('./db.json');


// * Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// * Rutas
// todo: Mensaje de bienvenida al iniciar el ruta principal de la API
app.get('/', (req, res) => {
    res.send('<h1>Inicio del servidor API con NODE EXPRESS</h1>');
})

// todo: Ruta de la API
// * GET /api/
app.get('/api/', (req, res) => {
    console.log(' => Muestro los datos de la API');
    res.status(200).json(data);
})
// * GET /api/:id
app.get('/api/:id', (req, res) => {
    const { id } = req.params;
    console.log(' => Muestro los datos de la API con el id: ', id);
    const newData = data.find(item => item.id === parseInt(id));
    if (newData) {
        res.status(200).json(newData);
    } else {
        res.status(404).json({ msg: 'No se encontro el id' });
    }
})
// * POST /api/
app.post('/api/', (req, res) => {
    const { nombres, direccion } = req.body;
    const newData = { id: data.length + 1, nombres, direccion };
    console.log(' => Agrego los datos de la API: ', newData);
    data.push(newData);
    res.status(200).json({
        message: 'Datos agregados correctamente',
    });
})
// * PUT /api/:id
app.put('/api/:id', (req, res) => {
    const { id } = req.params;
    const { nombres, direccion } = req.body;
    const newData = data.find(item => item.id === parseInt(id));
    console.log(' => Modifico los datos de la API con el id: ', id);
    if (newData) {
        newData.nombres = nombres;
        newData.direccion = direccion;
        res.status(200).json({
            message: 'Datos actualizados correctamente',
        });
    } else {
        res.status(404).json({ msg: 'No se encontro el id' });
    }
})
// * DELETE /api/:id
app.delete('/api/:id', (req, res) => {
    const { id } = req.params;
    const newData = data.find(item => item.id === parseInt(id));
    console.log(' => Elimino los datos de la API con el id: ', id);
    if (newData) {
        const index = data.indexOf(newData);
        data.splice(index, 1);
        res.status(200).json({
            message: 'Datos eliminados correctamente',
        });
    } else {
        res.status(404).json({ msg: 'No se encontro el id' });
    }
})


// * Inicio del servidor en el puerto 9000
app.listen(port, () => {
    console.log(` => Server is running on port ${port}`);
})