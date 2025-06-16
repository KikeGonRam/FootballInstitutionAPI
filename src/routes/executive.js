const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { createExecutive, getExecutives, updateExecutive, deleteExecutive } = require('../controllers/executiveController');
const auth = require('../middlewares/auth');

router.post(
    '/',
    [
        auth,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('team', 'El equipo es obligatorio').isMongoId(),
        check('position', 'El cargo es obligatorio').not().isEmpty(),
    ],
    createExecutive
);

router.get('/', getExecutives);

router.put(
    '/:id',
    [
        auth,
        check('name', 'El nombre es obligatorio').optional().not().isEmpty(),
        check('team', 'El equipo debe ser un ID válido').optional().isMongoId(),
        check('position', 'El cargo es obligatorio').optional().not().isEmpty(),
    ],
    updateExecutive
);

router.delete('/:id', auth, deleteExecutive);

module.exports = router;