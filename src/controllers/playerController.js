const Player = require('../models/Player');
const { validationResult } = require('express-validator');

const createPlayer = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, team, image, position } = req.body;
    try {
        const player = new Player({ name, team, image, position });
        await player.save();
        res.status(201).json(player);
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

const getPlayers = async (req, res) => {
    try {
        const players = await Player.find().populate('team');
        res.json(players);
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

const updatePlayer = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    try {
        const player = await Player.findByIdAndUpdate(id, req.body, { new: true });
        if (!player) {
            return res.status(404).json({ msg: req.t('error.not_found') || 'Jugador no encontrado' });
        }
        res.json(player);
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

const deletePlayer = async (req, res) => {
    const { id } = req.params;
    try {
        const player = await Player.findByIdAndDelete(id);
        if (!player) {
            return res.status(404).json({ msg: req.t('error.not_found') || 'Jugador no encontrado' });
        }
        res.json({ msg: req.t('success.deleted') || 'Jugador eliminado' });
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

module.exports = { createPlayer, getPlayers, updatePlayer, deletePlayer };