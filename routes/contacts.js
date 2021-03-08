const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const jws = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route   GET    api/contacts
// @desc    Get all user contacts
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });   // sort({ date: -1}) gets moust recent contacts first
        res.json(contacts)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST    api/contacts
// @desc    Add new contact
// @access  Private
router.post('/', [auth,
    check('name', 'Name is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });

        const contact = await newContact.save();

        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT    api/contacts/:id
// @desc    Update contatc
// @access  Private
router.put('/:id', (req, res) => {
    res.send('Update contatc');
});

// @route   DELETE    api/contatcs/:id
// @desc    DELETE contatc
// @access  Private
router.delete('/', (req, res) => {
    res.send('Delete contact');
});

module.exports = router;