    const User = require('../models/User');
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');
    const { validationResult } = require('express-validator');

    const register = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, role } = req.body;
        try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: req.t('error.user_exists') });
        }

        user = new User({ email, password: await bcrypt.hash(password, 10), role });
        await user.save();

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
        } catch (error) {
        res.status(500).json({ msg: 'Error en el servidor' });
        }
    };

    const login = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: req.t('error.invalid_credentials') });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: req.t('error.invalid_credentials') });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
        } catch (error) {
        res.status(500).json({ msg: 'Error en el servidor' });
        }
    };

    module.exports = { register, login };