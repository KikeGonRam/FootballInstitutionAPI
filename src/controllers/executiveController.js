const Executive = require('../models/Executive');
const { validationResult } = require('express-validator');

const createExecutive = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, team, image, position } = req.body;
    try {
        const executive = new Executive({ name, team, image, position });
        await executive.save();
        res.status(201).json(executive);
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

const getExecutives = async (req, res) => {
    try {
        const executives = await Executive.find();
        res.json(executives);
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

const updateExecutive = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    try {
        const executive = await Executive.findByIdAndUpdate(id, req.body, { new: true }).populate('team');
        if (!executive) {
        return res.status(404).json({ msg: req.t('error.not_found') || 'Directivo no encontrado' });
        }
        res.json(executive);
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

const deleteExecutive = async (req, res) => {
    const { id } = req.params;
    try {
        const executive = await Executive.findByIdAndDelete(id);
        if (!executive) {
        return res.status(404).json({ msg: req.t('error.not_found') || 'Directivo no encontrado' });
        }
        res.json({ msg: req.t('success.deleted') || 'Directivo eliminado' });
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

module.exports = { createExecutive, getExecutives, updateExecutive, deleteExecutive };