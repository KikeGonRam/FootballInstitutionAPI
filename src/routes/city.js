const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { createCity, getCities, updateCity, deleteCity } = require('../controllers/cityController');
const auth = require('../middlewares/auth');

router.post(
    '/',
    [
        auth,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('country', 'El país es obligatorio').isMongoId(),
    ],
    createCity
);

router.get('/', getCities);

router.put(
    '/:id',
    [
        auth,
        check('name', 'El nombre es obligatorio').optional().not().isEmpty(),
        check('country', 'El país debe ser un ID válido').optional().isMongoId(),
    ],
    updateCity
);

router.delete('/:id', auth, deleteCity);

module.exports = router;