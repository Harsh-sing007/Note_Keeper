function addNote() {
  const title = document.getElementById("note-title").value;
  const content = document.getElementById("note-content").value;

  if (!title || !content) {
    alert("Please enter both title and content");
    return;
  }

  const notes = JSON.parse(localStorage.getItem("notes") || "[]");
  notes.push({ title, content });
  localStorage.setItem("notes", JSON.stringify(notes));

  document.getElementById("note-title").value = "";
  document.getElementById("note-content").value = "";
  displayNotes();
}

function deleteNote(index) {
  const notes = JSON.parse(localStorage.getItem("notes") || "[]");
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
}

function displayNotes() {
  const notes = JSON.parse(localStorage.getItem("notes") || "[]");
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";

  notes.forEach((note, index) => {
    const noteEl = document.createElement("div");
    noteEl.className = "note";
    noteEl.innerHTML = `
      <span class="note-title">${note.title}</span>
      <button onclick="deleteNote(${index})">Delete</button>
      <p>${note.content}</p>
    `;
    notesList.appendChild(noteEl);
  });
}

// Load notes on page load
displayNotes();
