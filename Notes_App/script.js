const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Show notes from localStorage on page load
function showNotes() {
  // Parse stored notes or initialize as an empty array
  const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  storedNotes.forEach(noteContent => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    inputBox.innerText = noteContent; // Set the note's text
    img.src = "images/delete.png";

    inputBox.addEventListener("keyup", () => {
      updateStorage();
    });

    notesContainer.appendChild(inputBox).appendChild(img);
  });
}

function updateStorage() {
  // Collect all notes text and store them as an array in localStorage
  const notes = document.querySelectorAll(".input-box");
  const notesData = [];
  notes.forEach(note => {
    notesData.push(note.innerText);
  });
  localStorage.setItem("notes", JSON.stringify(notesData));
}

createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  img.src = "images/delete.png";

  inputBox.addEventListener("keyup", () => {
    updateStorage();
  });

  notesContainer.appendChild(inputBox).appendChild(img);
  updateStorage(); // Save the new note
});

notesContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    updateStorage();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});

showNotes(); // Call showNotes on page load to display saved notes
