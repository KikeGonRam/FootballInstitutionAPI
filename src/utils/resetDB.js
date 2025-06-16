const mongoose = require('mongoose');
const Country = require('../models/Country');
const City = require('../models/City');
const Team = require('../models/Team');
const Player = require('../models/Player');
const User = require('../models/User');
const Coach = require('../models/Coach');
const Referee = require('../models/Referee');
const Assistant = require('../models/Assistant');
const Executive = require('../models/Executive');
const User = require('../models/User');
const connectDB = require('../config/db');

const resetDB = async () => {
try {
// Conectar a la base de datos
await connectDB();

// Eliminar todas las colecciones
await Country.deleteMany({});
await City.deleteMany({});
await Team.deleteMany({});
await Player.deleteMany({});
await User.deleteMany({});
await Coach.deleteMany({});
await Referee.deleteMany({});
await Assistant.deleteMany({});
await Executive.deleteMany({});
await User.deleteMany({});

console.log('Base de datos restablecida correctamente');

// Opcional: Insertar datos iniciales mínimos
// Descomenta las siguientes líneas si quieres inicializar con datos básicos
/*
const country = await new Country({
    name: 'País Inicial',
    image: 'https://example.com/flags/initial.png',
}).save();

const city = await new City({
    name: 'Ciudad Inicial',
    country: country._id,
}).save();

const team = await new Team({
    name: 'Equipo Inicial',
    city: city._id,
    image: 'https://example.com/teams/initial.png',
}).save();

await new User({
    email: 'admin@initial.com',
    password: await require('bcryptjs').hash('password123', 10),
    role: 'admin',
}).save();

console.log('Datos iniciales insertados');
*/

// Cerrar la conexión
await mongoose.connection.close();
console.log('Conexión a MongoDB cerrada');
} catch (error) {
console.error('Error al restablecer la base de datos:', error);
process.exit(1);
}
};

// Ejecutar el script
resetDB();