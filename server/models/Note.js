const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  reminderDate: String,
  reminderTime: String,
  ringtone: String,
  email: { type: String, required: true }, // ✅ link by email
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
