const Referee = require('../models/Referee');
const { validationResult } = require('express-validator');

const createReferee = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, image, certification } = req.body;
    try {
        const referee = new Referee({ name, image, certification });
        await referee.save();
        res.status(201).json(referee);
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

const getReferees = async (req, res) => {
    try {
        const referees = await Referee.find();
        res.json(referees);
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

const updateReferee = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    try {
        const referee = await Referee.findByIdAndUpdate(id, req.body, { new: true });
        if (!referee) {
        return res.status(404).json({ msg: req.t('error.not_found') || 'Árbitro no encontrado' });
        }
        res.json(referee);
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

const deleteReferee = async (req, res) => {
    const { id } = req.params;
    try {
        const referee = await Referee.findByIdAndDelete(id);
        if (!referee) {
        return res.status(404).json({ msg: req.t('error.not_found') || 'Árbitro no encontrado' });
        }
        res.json({ msg: req.t('success.deleted') || 'Árbitro eliminado' });
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

module.exports = { createReferee, getReferees, updateReferee, deleteReferee };