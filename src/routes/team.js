const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { createTeam, getTeams, updateTeam, deleteTeam } = require('../controllers/teamController');
const auth = require('../middlewares/auth');

router.post(
    '/',
    [
        auth,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('city', 'La ciudad es obligatoria').isMongoId(),
        check('image', 'La imagen es obligatoria').not().isEmpty(),
    ],
    createTeam
);

router.get('/', getTeams);

router.put(
    '/:id',
    [
        auth,
        check('name', 'El nombre es obligatorio').optional().not().isEmpty(),
        check('city', 'La ciudad debe ser un ID válido').optional().isMongoId(),
        check('image', 'La imagen es obligatoria').optional().not().isEmpty(),
    ],
    updateTeam
);

router.delete('/:id', auth, deleteTeam);

module.exports = router;