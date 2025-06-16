const Coach = require('../models/Coach');
const { validationResult } = require('express-validator');

const createCoach = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, team, image, license } = req.body;
    try {
        const coach = new Coach({ name, team, image, license });
        await coach.save();
        res.status(201).json(coach);
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

const getCoaches = async (req, res) => {
    try {
        const coaches = await Coach.find();
        res.json(coaches);
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

const updateCoach = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    try {
        const coach = await Coach.findByIdAndUpdate(id, req.body, { new: true }).populate('team');
        if (!coach) {
        return res.status(404).json({ msg: req.t('error.not_found') || 'Entrenador no encontrado' });
        }
        res.json(coach);
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

const deleteCoach = async (req, res) => {
    const { id } = req.params;
    try {
        const coach = await Coach.findByIdAndDelete(id);
        if (!coach) {
        return res.status(404).json({ msg: req.t('error.not_found') || 'Entrenador no encontrado' });
        }
        res.json({ msg: req.t('success.deleted') || 'Entrenador eliminado' });
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

module.exports = { createCoach, getCoaches, updateCoach, deleteCoach };