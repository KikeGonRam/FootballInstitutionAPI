const express = require('express');
    const router = express.Router();
    const { createCountry, getCountries } = require('../controllers/countryController');
    const auth = require('../middlewares/auth');

    router.post('/', auth, createCountry);
    router.get('/', getCountries);

    module.exports = router;