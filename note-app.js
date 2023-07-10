const notebook = JSON.parse(localStorage.getItem("notebook")) || [];

let note = { id: 1, title: "", description: "", date: "", category: "home" };

const add_modal = document.querySelector(".add-modal-container");

const search_notes = document.querySelector(".search-input");

const search_icon = document.querySelector(".search-icon");

const add_modal_content = document.querySelector(".add-note-modal");

const close_modal = document.querySelector(".add-modal-cancel");

const addNewNote = document.querySelector(".add-modal-add");

let note_title = document.querySelector(".add-note-input");

let note_content = document.querySelector(".description");

const update_modal = document.querySelector(".update-modal-container");

const update_modal_content = document.querySelector(".update-note-modal");

const updateModalTitle = document.querySelector(".update-note-input");

const updateNote = document.querySelector(".update-modal-update");

const closeUpdateModal = document.querySelector(".update-modal-cancel");

const updateModalContent = document.querySelector(".update-note-description");

const modal_activator = document.querySelector(".add-note-button");

const icons = document.querySelector(".icons");

const edit = document.querySelector(".editNote");

let add_note_type = document.querySelector(".add-note-type");

let updateNoteType = document.querySelector(".update-note-type");

const emptyNote = document.querySelector(".empty-notes");

let noteCard = document.querySelector(".note");

const noteContent = document.querySelector(".note-content");

const noteTitle = document.querySelector(".note-title");

const tabs = document.querySelectorAll(".tab");

const allTab = document.querySelector(".all");

const content = document.querySelector(".content");

const checkTitle = document.querySelector(".check-title");

const colors = ["orange", "blue", "green", "gray"];

modal_activator.addEventListener("click", activateModal);

close_modal.addEventListener("click", closeModal);

addNewNote.addEventListener("click", add_title);

addNewNote.addEventListener("click", add_date);

let title;

tabs.forEach((tab, index) => {
  tab.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("TABS", event.target.innerHTML.toLowerCase());
    const tabName = event.target.innerHTML.toLowerCase();
    const filteredData = notebook.filter(
      (note, index) => note.category.toLowerCase() === tabName
    );
    content.innerHTML = `
   ${filteredData
     .map(
       (data) =>
         `
         <div class = "content">
          <div class="note"  style = 'background-color: ${
            data.category === "home"
              ? colors[0]
              : data.category === "work"
              ? colors[1]
              : colors[2]
          }'>
            <div class="check-title">
              <div class="check">
                <img name = "checkbox" class src="./assets/Web 1366 – 1/empty-checkbox.png" alt="">
                <p class="note-title">${data.title}</p>
              </div>
              
              <div class="icons"> <!--style='z-index: 10000'-->
                 <button class="editNote" onclick='editNote(${JSON.stringify(
                   data
                 )})'>
                <img name='edit' src="./assets/Web 1366 – 1/edit.png" alt="" />
              </button>
              <button class="trash" onclick='deleteNote(${JSON.stringify(
                data
              )})'>
                <img src="./assets/Web 1366 – 1/trash.png" alt="" />
              </button>
              </div>
            </div>
            <p class="note-content">${data.description}</p>
            <p class = "date">${data.date}</p>        
          </div>
        </div>
      </div>
    `
     )
     .join(" ")}
  `;
    console.log(filteredData, "FILTERED");
    tabs.forEach((tab) => {
      tab.classList.remove("active");
      allTab.style.backgroundColor = "transparent";
      allTab.style.color = "black";
    });
    tab.classList.add("active", `tab${index + 1}`);
    console.log("TABS", notebook);
  });
});
function activateModal() {
  add_modal.classList.add("modal-activated");
}

function closeModal() {
  add_modal.classList.remove("modal-activated");
  update_modal.classList.remove("modal-activated");
  note_content.reset;
  note_title.clear;
}
function add_title() {
  title = note_title.value;
  note.title = title;
  note.description = note_content.value;
  note.category = add_note_type.value;
  const lastIndex = notebook.length - 1;
  lastItem = notebook.slice(lastIndex);
  note.id = lastItem?.[0]?.id + 1 || 1;
  notebook.push(note);
  content.style.display = "block";
  const currentDate = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = currentDate.getDate();
  const month = currentDate.getMonth(); // Months are zero-based
  const year = currentDate.getFullYear();
  const formattedDate = months[month] + " " + day + ", " + year;
  console.log(formattedDate);
  note.date = formattedDate;
  localStorage.setItem("notebook", JSON.stringify(notebook));
  note_title.value = "";
  add_note_type.value = "";
  note_content.value = "";
  window.location.reload();
  console.log(notebook);
  closeModal();
}
function add_date() {}
allTab.addEventListener("click", (event) => {
  if (notebook.length < 1) {
    emptyNote.style.display = "flex";
  } else {
    emptyNote.style.display = "none";
    content.innerHTML = `
   ${notebook
     .map(
       (data) =>
         `
        <div class = "content">
          <div class="note"  style = 'background-color: ${
            data.category === "home"
              ? colors[0]
              : data.category === "work"
              ? colors[1]
              : colors[2]
          }'>
            <div class="check-title">
              <div class="check">
                <img name="checkbox" src="./assets/Web 1366 – 1/empty-checkbox.png" alt="">
                <p class="note-title">${data.title}</p>
              </div>
              <div class="icons">
                <button class="editNote" onclick='editNote(${JSON.stringify(
                  data
                )})'>
                  <img name='edit' src="./assets/Web 1366 – 1/edit.png" alt="" />
                </button>
                <button class="trash" onclick='deleteNote(${JSON.stringify(
                  data
                )})'>
                  <img src="./assets/Web 1366 – 1/trash.png" alt="" />
                </button>
              </div>
            </div>
            <p class="note-content">${data.description}</p>
            <p class ="date">${data.date}</p>
          </div>
          </div>
        </div>
    `
     )
     .join(" ")}
  `;
  }
  tabs.forEach((tab) => {
    tab.classList.remove("active");
    allTab.style.backgroundColor = "lightblue";
    allTab.style.color = "white";
  });
});
window.addEventListener("DOMContentLoaded", () => {
  if (notebook.length < 1) {
    emptyNote.style.display = "flex";
  } else {
    emptyNote.style.display = "none";

    content.innerHTML = `
   ${notebook
     .map(
       (data) =>
         `
        <div class = "content">
          <div class="note"  style = 'background-color: ${
            data.category === "home"
              ? colors[0]
              : data.category === "work"
              ? colors[1]
              : colors[2]
          }'>
            <div class="check-title">
              <div class="check">
                <img name = "checkbox" src="./assets/Web 1366 – 1/empty-checkbox.png" alt="">
                <p class="note-title">${data.title}</p>
              </div>
              <div class="icons">
                <button class="editNote" onclick='editNote(${JSON.stringify(
                  data
                )})'>
                  <img name='edit' src="./assets/Web 1366 – 1/edit.png" alt="" />
                </button>
                <button class="trash" onclick='deleteNote(${JSON.stringify(
                  data
                )})'>
                  <img src="./assets/Web 1366 – 1/trash.png" alt="" />
                </button>
              </div>
            </div>
            <p class="note-content">${data.description}</p>
            <p class="date">${data.date}</p>
          </div>
          </div>
        </div>
    `
     )
     .join(" ")}
  `;
  }
});

content.addEventListener("click", (event) => {
  const tagName = event.target.name;
  if (tagName === "edit") {
    update_modal.classList.add(["modal-activated"]);
  } else if (tagName === "checkbox") {
    event.target.src =
      "http://127.0.0.1:5500/assets/Web%201366%20%E2%80%93%201/fill-checkbox.png";
    event.target.name = "fill-checkbox";
    noteCard.classList.add(".read-note");
    console.log(noteCard);
  } else if (tagName === "fill-checkbox") {
    event.target.src =
      "http://127.0.0.1:5500/assets/Web%201366%20%E2%80%93%201/empty-checkbox.png";
    event.target.name = "checkbox";
    noteCard.classList.remove(".read-note");
    console.log(noteCard);
  }
});

function updatenote(data) {
  const updatedNote = notebook.map((todo) => {
    datum = {};
    if (Number(todo.id) === Number(note.id)) {
      datum = { ...todo, ...note };
    }
    console.log("TODO", datum);
    return datum;
  });
  localStorage.setItem("notebook", JSON.stringify(updatedNote));
  window.location.reload();
}

function editNote(data) {
  updateModalContent.value = data.description;
  updateModalTitle.value = data.title;
  updateNoteType.value = data.category;
  note = data;
}

function readNote() {
  note.style.textDecoration = "lineThrough";
}

updateNote.addEventListener("click", updatenote);

function deleteNote(data) {
  const dataLeft = notebook.filter((note) => note.id !== data.id);
  localStorage.setItem("notebook", JSON.stringify(dataLeft));
  window.location.reload();
}

updateModalContent.addEventListener("change", (e) => {
  note.description = e.target.value;
});

updateModalTitle.addEventListener("change", (e) => {
  note.title = e.target.value;
});

updateNoteType.addEventListener("change", (e) => {
  note.category = e.target.value;
});

search_notes.addEventListener("keydown", inputRun);

function inputRun(event) {
  if (event.key === "Enter") {
    const result = notebook.filter(
      (note, index) =>
        note.title.toLowerCase() === search_notes.value.toLowerCase()
    );
    allTab.addEventListener("click", (event) => {
      content.innerHTML = `
   ${result
     .map(
       (data) =>
         `
        <div class = "content">
          <div class="note"  style = 'background-color: ${
            data.category === "home"
              ? colors[0]
              : data.category === "work"
              ? colors[1]
              : colors[2]
          }'>
            <div class="check-title">
              <div class="check">
                <img name="checkbox" src="./assets/Web 1366 – 1/empty-checkbox.png" alt="">
                <p class="note-title">${data.title}</p>
              </div>
              <div class="icons">
                <button class="editNote" onclick='editNote(${JSON.stringify(
                  data
                )})'>
                  <img name='edit' src="./assets/Web 1366 – 1/edit.png" alt="" />
                </button>
                <button class="trash" onclick='deleteNote(${JSON.stringify(
                  data
                )})'>
                  <img src="./assets/Web 1366 – 1/trash.png" alt="" />
                </button>
              </div>
            </div>
            <p class="note-content">${data.description}</p>
            <p class ="date">${data.date}</p>
          </div>
          </div>
        </div>
    `
     )
     .join(" ")}
  `;

      tabs.forEach((tab) => {
        tab.classList.remove("active");
        allTab.style.backgroundColor = "lightblue";
        allTab.style.color = "white";
      });
    });
    if(result == ""){
      alert("Note does not exist");
      window.location.reload();
    }
  }
}
search_notes.addEventListener("focus", hideIcon);
function hideIcon() {
  search_icon.style.display = "none";
}

{/* <button onclick="openModal()">Open Pop-up</button>

<div id="myModal" class="modal">
  <div class="modal-content">
    <span class="close" onclick="closeModal()">&times;</span>
    <p>This is a custom pop-up message!</p>
  </div>
</div>

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

function openModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
}

function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
} */}
