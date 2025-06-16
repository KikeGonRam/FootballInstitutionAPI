const Country = require('../models/Country');

    const createCountry = async (req, res) => {
        const { name, image } = req.body;
        try {
        const country = new Country({ name, image });
        await country.save();
        res.status(201).json(country);
        } catch (error) {
        res.status(500).json({ msg: 'Error al crear país' });
        }
    };

    const getCountries = async (req, res) => {
        try {
        const countries = await Country.find();
        res.json(countries);
        } catch (error) {
        res.status(500).json({ msg: 'Error al obtener países' });
        }
    };

    module.exports = { createCountry, getCountries };