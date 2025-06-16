const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { createAssistant, getAssistants, updateAssistant, deleteAssistant } = require('../controllers/assistantController');
const auth = require('../middlewares/auth');

router.post(
    '/',
    [
        auth,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('team', 'El equipo es obligatorio').isMongoId(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
    ],
    createAssistant
);

router.get('/', getAssistants);

router.put(
    '/:id',
    [
        auth,
        check('name', 'El nombre es obligatorio').optional().not().isEmpty(),
        check('team', 'El equipo debe ser un ID válido').optional().isMongoId(),
        check('role', 'El rol es obligatorio').optional().not().isEmpty(),
    ],
    updateAssistant
);

router.delete('/:id', auth, deleteAssistant);

module.exports = router;