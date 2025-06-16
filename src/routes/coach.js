const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { createCoach, getCoaches, updateCoach, deleteCoach } = require('../controllers/coachController');
const auth = require('../middlewares/auth');

router.post(
    '/',
    [
        auth,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('team', 'El equipo es obligatorio').isMongoId(),
        check('license', 'La licencia es obligatoria').not().isEmpty(),
    ],
    createCoach
);

router.get('/', getCoaches);

router.put(
    '/:id',
    [
        auth,
        check('name', 'El nombre es obligatorio').optional().not().isEmpty(),
        check('team', 'El equipo debe ser un ID válido').optional().isMongoId(),
        check('license', 'La licencia es obligatoria').optional().not().isEmpty(),
    ],
    updateCoach
);

router.delete('/:id', auth, deleteCoach);

module.exports = router;