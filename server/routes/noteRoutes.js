const express = require('express');
const { createNote, getNotesByEmail } = require('../controllers/noteController');

const router = express.Router();

router.post('/', createNote);        // save note
router.get('/:email', getNotesByEmail); // fetch notes by email

module.exports = router;
