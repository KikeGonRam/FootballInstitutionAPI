const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { createPlayer, getPlayers, updatePlayer, deletePlayer } = require('../controllers/playerController');
const auth = require('../middlewares/auth');

router.post(
    '/',
    [
        auth,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('team', 'El equipo es obligatorio').isMongoId(),
        check('image', 'La imagen es obligatoria').not().isEmpty(),
        check('position', 'La posición es obligatoria').not().isEmpty(),
    ],
    createPlayer
);

router.get('/', getPlayers);

router.put(
    '/:id',
    [
        auth,
        check('name', 'El nombre es obligatorio').optional().not().isEmpty(),
        check('team', 'El equipo debe ser un ID válido').optional().isMongoId(),
        check('image', 'La imagen es obligatoria').optional().not().isEmpty(),
        check('position', 'La posición es obligatoria').optional().not().isEmpty(),
    ],
    updatePlayer
);

router.delete('/:id', auth, deletePlayer);

module.exports = router;