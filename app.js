// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const userRoutes = require('./routes/users');
const articleRoutes = require('./routes/articles');

const app = express();


// Rutas públicas (no requieren autenticación)
app.post('/signup', createUsers);
app.post('/signin', loginUsers);

// Middlewares
app.use(auth);
app.use(cors());
app.use(express.json());
app.use(requestLogger);


// Rutas protegidas
app.use('/users', usersRoutes);
app.use('/articles', articleRoutes);

// Ruta 404
app.use((req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

// Manejo de errores
app.use(errorLogger);
app.use(errorHandler);
app.use(errors());


// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    console.log('conectado a la base de datos');
  })
  .catch((err) => {
    console.error('Error conectando a MongoDB:', err);
  });

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});

