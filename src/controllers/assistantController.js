const Assistant = require('../models/Assistant');
const { validationResult } = require('express-validator');

const createAssistant = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, team, image, role } = req.body;
    try {
        const assistant = new Assistant({ name, team, image, role });
        await assistant.save();
        res.status(201).json(assistant);
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

const getAssistants = async (req, res) => {
    try {
        const assistants = await Assistant.find();
        res.json(assistants);
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

const updateAssistant = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    try {
        const assistant = await Assistant.findByIdAndUpdate(id, req.body, { new: true }).populate('team');
        if (!assistant) {
        return res.status(404).json({ msg: req.t('error.not_found') || 'Auxiliar no encontrado' });
        }
        res.json(assistant);
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

const deleteAssistant = async (req, res) => {
    const { id } = req.params;
    try {
        const assistant = await Assistant.findByIdAndDelete(id);
        if (!assistant) {
        return res.status(404).json({ msg: req.t('error.not_found') || 'Auxiliar no encontrado' });
        }
        res.json({ msg: req.t('success.deleted') || 'Auxiliar eliminado' });
    } catch (error) {
        res.status(500).json({ msg: req.t('error.server_error') || 'Error en el servidor' });
    }
};

module.exports = { createAssistant, getAssistants, updateAssistant, deleteAssistant };