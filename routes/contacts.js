const express = require('express');
const router = express.Router();

// @route   GET    api/contacts
// @desc    Get all user contacts
// @access  Private
router.get('/', (req, res) => {
    res.send('Get all contacts');
});

// @route   POST    api/contacts
// @desc    Add new contact
// @access  Private
router.get('/', (req, res) => {
    res.send('Add contact');
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