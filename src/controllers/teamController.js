const Team = require('../models/Team');
const { validationResult } = require('express-validator');

const createTeam = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, city, image } = req.body;
    try {
        const team = new Team({ name, city, image });
        await team.save();
        res.status(201).json(team);
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

const getTeams = async (req, res) => {
    try {
        const teams = await Team.find().populate('city');
        res.json(teams);
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

const updateTeam = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    try {
        const team = await Team.findByIdAndUpdate(id, req.body, { new: true });
        if (!team) {
            return res.status(404).json({ msg: req.t('error.not_found') || 'Equipo no encontrado' });
        }
        res.json(team);
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

const deleteTeam = async (req, res) => {
    const { id } = req.params;
    try {
        const team = await Team.findByIdAndDelete(id);
        if (!team) {
            return res.status(404).json({ msg: req.t('error.not_found') || 'Equipo no encontrado' });
        }
        res.json({ msg: req.t('success.deleted') || 'Equipo eliminado' });
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

module.exports = { createTeam, getTeams, updateTeam, deleteTeam };