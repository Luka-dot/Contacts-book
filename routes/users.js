const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');

// @route   POST    api/users
// @desc    Register a user
// @access  Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),   // check for name is not empty
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Please enter password (min 6 char.)').isLength({min: 6}),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    res.send('Passed');
});

module.exports = router;