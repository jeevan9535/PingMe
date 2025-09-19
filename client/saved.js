// saved.js

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  if (!token || !email) {
    alert("Please login first.");
    window.location.href = "login.html";
    return;
  }

  fetchNotes(email, token);
});

// Fetch notes from backend using email
async function fetchNotes(email, token) {
  try {
    const response = await fetch(`/api/notes/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch notes");

    const notes = await response.json();
    displayNotes(notes);
  } catch (error) {
    console.error("Error loading notes:", error);
    const container = document.getElementById("notes-container");
    container.innerHTML = "<p>Error loading notes.</p>";
  }
}

// Display notes as cards
function displayNotes(notes) {
  const container = document.getElementById("notes-container");
  container.innerHTML = "";

  if (!notes || notes.length === 0) {
    container.innerHTML = "<p>No notes found</p>";
    return;
  }

  notes.forEach((note) => {
    const card = document.createElement("div");
    card.classList.add("note-card");
    card.innerHTML = `
      <h3>${note.title}</h3>
      <p class="remarks">${note.remarks || "No remarks added"}</p>
      <div class="note-footer">
        <span>${note.date ? new Date(note.date).toLocaleDateString() : "Not set"}</span>
        <span>${note.time || "Not set"}</span>
      </div>
    `;

    // Open modal when clicked
    card.addEventListener("click", () => openNoteModal(note));

    container.appendChild(card);
  });
}

// Use the existing modal in saved.html
function openNoteModal(note) {
  const modal = document.getElementById("noteModal");
  const closeBtn = modal.querySelector(".close-btn");

  document.getElementById("modalTitle").textContent = note.title;
  document.getElementById("modalRemarks").textContent = note.remarks || "No remarks added";
  document.getElementById("modalDate").textContent = note.date ? new Date(note.date).toLocaleDateString() : "Not set";
  document.getElementById("modalTime").textContent = note.time || "Not set";

  // Store note id for deletion
  const deleteBtn = document.getElementById("deleteBtn");
  deleteBtn.onclick = async () => {
    if (confirm("Are you sure you want to delete this note?")) {
      await deleteNote(note._id);
      modal.style.display = "none";
      fetchNotes(localStorage.getItem("email"), localStorage.getItem("token"));
    }
  };

  modal.style.display = "block";

  // Close modal
  closeBtn.onclick = () => {
    modal.style.display = "none";
  };

  // Close if clicked outside
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}

// Delete note API call
async function deleteNote(noteId) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to delete note");

    alert("Note deleted successfully!");
  } catch (error) {
    console.error("Error deleting note:", error);
    alert("Error deleting note");
  }
}
