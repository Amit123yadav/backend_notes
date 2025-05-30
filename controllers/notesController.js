const Note = require("../models/Note");

// get all notes

const getNotes = async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.send(notes);
};

// add Notes

const addNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = await Note.create({ title, content });
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete note

const deleteNote = async (req, res) => {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id);
    if (!deleteNote) {
      return res.status(400).json({ error: "Note not found" });
    }
    res.status(200).json({ message: "Note Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const editNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!note) {
      return res.status(400).json({ error: "Note not found" });
    }
    return res.status(200).json({ message: "Note Edit Successfully " });
  } catch (error) {
    res.status(400).json({ error: "Note Not Found" });
  }
};

module.exports = { getNotes, addNote, deleteNote, editNote };
