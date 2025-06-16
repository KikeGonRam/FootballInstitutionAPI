const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { createReferee, getReferees, updateReferee, deleteReferee } = require('../controllers/refereeController');
const auth = require('../middlewares/auth');

router.post(
    '/',
    [
        auth,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('certification', 'La certificación es obligatoria').not().isEmpty(),
    ],
    createReferee
);

router.get('/', getReferees);

router.put(
    '/:id',
    [
        auth,
        check('name', 'El nombre es obligatorio').optional().not().isEmpty(),
        check('certification', 'La certificación es obligatoria').optional().not().isEmpty(),
    ],
    updateReferee
);

router.delete('/:id', auth, deleteReferee);

module.exports = router;