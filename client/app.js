const addNoteBtn = document.getElementById('addNoteBtn');
const noteText = document.getElementById('noteText');
const notesList = document.getElementById('notesList');

addNoteBtn.addEventListener('click', () => {
  const text = noteText.value.trim();

  if (text === '') {
    alert('Please enter a note.');
    return;
  }

  const note = document.createElement('div');
  note.className = 'note-item';
  note.innerText = text;
  notesList.appendChild(note);

  noteText.value = '';
});
