    const express = require('express');
    const router = express.Router();
    const { register, login } = require('../controllers/authController');
    const { check } = require('express-validator');

    router.post(
        '/register',
        [
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
        check('role', 'El rol es obligatorio').isIn(['admin', 'coach', 'player', 'referee', 'assistant', 'executive']),
        ],
        register
    );

    router.post(
        '/login',
        [
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').exists(),
        ],
        login
    );

    module.exports = router;