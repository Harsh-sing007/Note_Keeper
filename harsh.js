let editIndex = -1; // Track which note is being edited

function addOrUpdateNote() {
  const title = document.getElementById("note-title").value;
  const content = document.getElementById("note-content").value;

  if (!title || !content) {
    alert("Please enter both title and content");
    return;
  }

  const notes = JSON.parse(localStorage.getItem("notes") || "[]");

  if (editIndex === -1) {
    // Add mode
    notes.push({ title, content });
  } else {
    // Edit mode
    notes[editIndex] = { title, content };
    editIndex = -1; // Reset after update
    document.querySelector("button").innerText = "Add Note";
  }

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

function editNote(index) {
  const notes = JSON.parse(localStorage.getItem("notes") || "[]");
  document.getElementById("note-title").value = notes[index].title;
  document.getElementById("note-content").value = notes[index].content;
  document.querySelector("button").innerText = "Update Note";
  editIndex = index;
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
      <button onclick="editNote(${index})">Edit</button>
      <button onclick="deleteNote(${index})">Delete</button>
      <p>${note.content}</p>
    `;
    notesList.appendChild(noteEl);
  });
}

displayNotes();
