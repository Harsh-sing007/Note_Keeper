let notes = JSON.parse(localStorage.getItem("notes")) || [];

function addNote() {
  const title = document.getElementById("note-title").value.trim();
  const content = document.getElementById("note-content").value.trim();

  if (!title || !content) {
    alert("Please fill in both title and content.");
    return;
  }

  const note = { title, content };
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));

  document.getElementById("note-title").value = "";
  document.getElementById("note-content").value = "";

  displayNotes();
}

function displayNotes() {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";

  notes.forEach((note, index) => {
    const noteItem = document.createElement("div");
    noteItem.className = "note";

    noteItem.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <button onclick="deleteNote(${index})">Delete</button>
    `;

    notesList.appendChild(noteItem);
  });
}

function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
}

displayNotes();
