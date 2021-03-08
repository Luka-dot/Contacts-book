const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jws = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   POST    api/users
// @desc    Register a user
// @access  Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),   // check for name is not empty
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Please enter password (min 6 char.)').isLength({min: 6}),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email: email });

        if (user) {
            res.status(400).json({ msg: 'user already exists.'});
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jws.sign(payload, config.get('jwtSecret'), {            // same as jws.sign(payload, "secretCode");
            expiresIn: 360000
        }, (err, token) => {
            if(err) throw err;
            res.json({ token });
        });  

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;