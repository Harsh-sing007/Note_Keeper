let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editIndex = -1;

function addOrUpdateNote() {
  const titleInput = document.getElementById("note-title");
  const contentInput = document.getElementById("note-content");
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) {
    alert("Please fill in both fields.");
    return;
  }

  const note = { title, content };

  if (editIndex === -1) {
    notes.push(note);
  } else {
    notes[editIndex] = note;
    editIndex = -1;
  }

  localStorage.setItem("notes", JSON.stringify(notes));
  titleInput.value = "";
  contentInput.value = "";
  displayNotes();
}

function displayNotes() {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";

  notes.forEach((note, index) => {
    const noteCard = document.createElement("div");
    noteCard.className = "bg-gray-50 border p-4 rounded-md shadow-sm";

    noteCard.innerHTML = `
      <h3 class="text-xl font-semibold">${note.title}</h3>
      <p class="text-gray-700">${note.content}</p>
      <div class="mt-2 flex gap-2">
        <button onclick="editNote(${index})"
                class="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500">Edit</button>
        <button onclick="deleteNote(${index})"
                class="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
      </div>
    `;

    notesList.appendChild(noteCard);
  });
}

function deleteNote(index) {
  if (confirm("Are you sure you want to delete this note?")) {
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
  }
}

function editNote(index) {
  const note = notes[index];
  document.getElementById("note-title").value = note.title;
  document.getElementById("note-content").value = note.content;
  editIndex = index;
}

displayNotes();
