const City = require('../models/City');
const { validationResult } = require('express-validator');

const createCity = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, country } = req.body;
    try {
        const city = new City({ name, country });
        await city.save();
        res.status(201).json(city);
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

const getCities = async (req, res) => {
    try {
        const cities = await City.find().populate('country');
        res.json(cities);
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

const updateCity = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    try {
        const city = await City.findByIdAndUpdate(id, req.body, { new: true });
        if (!city) {
            return res.status(404).json({ msg: req.t('error.not_found') || 'Ciudad no encontrada' });
        }
        res.json(city);
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

const deleteCity = async (req, res) => {
    const { id } = req.params;
    try {
        const city = await City.findByIdAndDelete(id);
        if (!city) {
            return res.status(404).json({ msg: req.t('error.not_found') || 'Ciudad no encontrada' });
        }
        res.json({ msg: req.t('success.deleted') || 'Ciudad eliminada' });
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

module.exports = { createCity, getCities, updateCity, deleteCity };