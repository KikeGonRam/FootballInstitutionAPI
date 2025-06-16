const express = require('express');
const connectDB = require('./config/db');
const i18nMiddleware = require('./middlewares/i18n');
const { swaggerUi, swaggerDocument } = require('./docs/swagger');
require('dotenv').config();

const app = express();

// Configuración mejorada de MongoDB
connectDB().then(() => {
  console.log('MongoDB inicializado correctamente');
}).catch(err => {
  console.error('Fallo en conexión a MongoDB:', err);
});

// Middlewares con manejo de errores
app.use(express.json());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'JSON malformado' });
  }
  next();
});

app.use(i18nMiddleware);

// Rutas con logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Importar rutas
const routes = [
    { path: '/auth', route: require('./routes/auth') },
    { path: '/countries', route: require('./routes/country') },
    { path: '/coaches', route: require('./routes/coach') },
    { path: '/referees', route: require('./routes/referee') },
    { path: '/assistants', route: require('./routes/assistant') },
    { path: '/executives', route: require('./routes/executive') },
    { path: '/teams', route: require('./routes/team') },         
    { path: '/players', route: require('./routes/player') },
    { path: '/cities', route: require('./routes/city') }, 
];

routes.forEach(({ path, route }) => {
    app.use(path, route);
    console.log(`Ruta registrada: ${path}`);
});

// Documentación
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Manejador de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Exportar app para pruebas
module.exports = app;

// Iniciar servidor solo si no está en modo de prueba
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Documentación disponible en /docs`);
  });

  // Manejo de errores del servidor
  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`El puerto ${PORT} está en uso`);
    } else {
      console.error('Error del servidor:', error);
    }
    process.exit(1);
  });
}