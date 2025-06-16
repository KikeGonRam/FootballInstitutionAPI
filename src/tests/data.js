const mongoose = require('mongoose');
const Country = require('../models/Country');
const City = require('../models/City');
const Team = require('../models/Team');
const Player = require('../models/Player');
const connectDB = require('../config/db');

const seedData = async () => {
    try {
        await connectDB();
        console.log('Conexión a la base de datos establecida');

        // Limpiar colecciones
        await Promise.all([
            Country.deleteMany({}),
            City.deleteMany({}),
            Team.deleteMany({}),
            Player.deleteMany({})
        ]);
        console.log('Colecciones limpiadas');

        // Insertar países en lotes de 100
        const countries = Array.from({ length: 1000 }, (_, i) => ({
            name: `País ${i + 1}`,
            image: `https://example.com/flags/country${i + 1}.png`,
        }));
        await Country.insertMany(countries, { ordered: true });
        console.log('1000 países insertados');

        // Insertar ciudades en lotes
        const countryDocs = await Country.find().lean();
        const cities = Array.from({ length: 1000 }, (_, i) => ({
            name: `Ciudad ${i + 1}`,
            country: countryDocs[i % countryDocs.length]._id,
        }));
        await City.insertMany(cities, { ordered: true });
        console.log('1000 ciudades insertadas');

        // Insertar equipos en lotes
        const cityDocs = await City.find().lean();
        const teams = Array.from({ length: 1000 }, (_, i) => ({
            name: `Equipo ${i + 1}`,
            city: cityDocs[i % cityDocs.length]._id,
            image: `https://example.com/teams/team${i + 1}.png`,
        }));
        await Team.insertMany(teams, { ordered: true });
        console.log('1000 equipos insertados');

        // Insertar jugadores en lotes
        const teamDocs = await Team.find().lean();
        const players = Array.from({ length: 1000 }, (_, i) => ({
            name: `Jugador ${i + 1}`,
            team: teamDocs[i % teamDocs.length]._id,
            image: `https://example.com/players/player${i + 1}.png`,
            position: 'Delantero',
        }));
        await Player.insertMany(players, { ordered: true });
        console.log('1000 jugadores insertados');

    } catch (error) {
        console.error('Error durante el seeding:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Conexión a la base de datos cerrada');
    }
};

// Ejecutar el seeding y manejar errores
seedData().catch(error => {
    console.error('Error fatal durante el seeding:', error);
    process.exit(1);
});