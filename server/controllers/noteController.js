const Note = require('../models/Note');

// @route POST /api/notes
// @desc Save a new note
const createNote = async (req, res) => {
  const { title, content, reminderDate, reminderTime, ringtone, email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'User email is required' });
  }

  try {
    const note = await Note.create({
      title,
      content,
      reminderDate,
      reminderTime,
      ringtone,
      email
    });

    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while saving note' });
  }
};

// @route GET /api/notes/:email
// @desc Get all notes for a user
const getNotesByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const notes = await Note.find({ email }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching notes' });
  }
};

module.exports = { createNote, getNotesByEmail };
