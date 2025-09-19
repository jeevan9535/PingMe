const modal = document.getElementById('noteModal');

// Open the add note modal
function openModal() {
  modal.style.display = 'flex';
}

// Close the modal
function closeModal() {
  modal.style.display = 'none';
}

// Clear all form fields
function clearNote() {
  document.getElementById('noteTitleInput').value = '';
  document.getElementById('noteContent').value = '';
  document.getElementById('reminderDate').value = '';
  document.getElementById('reminderTime').value = '';
  document.getElementById('ringtone').value = '';
}

// Save the note to backend (MongoDB)
async function saveNote() {
  const title = document.getElementById('noteTitleInput').value.trim();
  const content = document.getElementById('noteContent').value.trim();
  const reminderDate = document.getElementById('reminderDate').value;
  const reminderTime = document.getElementById('reminderTime').value;
  const ringtone = document.getElementById('ringtone').value;

  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email'); // ✅ get email

  if (!token || !email) {
    alert('You are not logged in.');
    return;
  }

  if (!title) {
    alert('Please enter a note title.');
    return;
  }

  const noteData = {
    title,
    content,
    reminderDate,
    reminderTime,
    ringtone,
    email // ✅ link note by email
  };

  try {
    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(noteData)
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Failed to save note');
    }

    alert('Note saved successfully!');
    clearNote();
    closeModal();
  } catch (err) {
    console.error(err);
    alert('Error saving note: ' + err.message);
  }
}

// Close modal on outside click
window.onclick = function(event) {
  if (event.target === modal) {
    closeModal();
  }
}

// Logout function
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  window.location.href = '/login.html';
}
