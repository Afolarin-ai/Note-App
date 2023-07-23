const notebook = JSON.parse(localStorage.getItem("notebook")) || [];
const checkboxState = JSON.parse(localStorage.getItem("status"));
let note = {
  id: 1,
  title: "",
  description: "",
  date: "",
  category: "home",
  status: "pending",
};

const add_modal = document.querySelector(".add-modal-container");

const search_notes = document.querySelector(".search-input");

const search_icon = document.querySelector(".search-icon");

const add_modal_content = document.querySelector(".add-note-modal");

const close_modal = document.querySelector(".add-modal-cancel");

const addNewNote = document.querySelector(".add-modal-add");

let note_title = document.querySelector(".add-note-input");

let note_content = document.querySelector(".description");

let check_div = document.querySelector(".check");

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

const emptyTab = document.querySelector(".empty-tab")

const allTab = document.querySelector(".all");

const content = document.querySelector(".content");

const noteChecker = document.querySelector(".checker");

const checkTitle = document.querySelector(".check-title");

const counter = document.querySelector(".counter");

const colors = ["orange", "blue", "green", "gray"];

modal_activator.addEventListener("click", activateModal);

close_modal.addEventListener("click", closeModal);

const login = document.querySelector(".login");
const loginPage = document.querySelector(".signin");
const signup = document.querySelector(".Signup");
const signupPage = document.querySelector(".signup");

addNewNote.addEventListener("click", add_title);

addNewNote.addEventListener("click", add_date);

let title;

tabs.forEach((tab, index) => {
  tab.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("TABS", event.target.innerHTML.toLowerCase());
    const tabName = event.target.innerHTML.toLowerCase();
    const filteredData = notebook.filter(
      (note) => note.category.toLowerCase() === tabName
    );
    if(filteredData.length < 1){
      emptyTab.style.display = "flex";
      emptyNote.style.display = "none"
    }
    else{
      content.innerHTML = `
    ${filteredData
      .map(
        (data) =>
          `
            <div class="note"  style = 'background-color: ${
              data.status === "read"
                ? "gray"
                : data.category === "home"
                ? colors[0]
                : data.category === "work"
                ? colors[1]
                : colors[2]
            }; text-decoration:${
            data.status === "pending"
              ? "none"
              : data.status === "read"
              ? "line-through"
              : ""
          }'>
              <div class="check-title">
                <div class="check">
                  <img src=${
                    data.status === "pending"
                      ? "./assets/imagws/empty-checkbox.png"
                      : data.status === "read"
                      ? "./assets/imagws/fill-checkbox.png"
                      : ""
                  } alt="" name = ${
            data.status === "pending"
              ? "checker"
              : data.status === "read"
              ? "checked"
              : ""
          }>
                  <p class="note-title">${data.title}</p>
                </div>
                <div class="icons">
                  <button class="editNote" onclick='editNote(${JSON.stringify(
                    data
                  )})'>
                    <img name='edit' src="./assets/imagws/edit.png" alt="" />
                  </button>
                  <button class="trash" onclick='deleteNote(${JSON.stringify(
                    data
                  )})'>
                    <img src="./assets/imagws/trash.png" alt="" />
                  </button>
                </div>
              </div>
              <div><p class="note-content">${data.description}</p></div>
              <p class="date" style = 'text-decoration:${
                data.status === "pending"
                  ? "none"
                  : data.status === "read"
                  ? "line-through"
                  : ""
              }'>${data.date}</p>            
            </div>
      `
      )
      .join(" ")}
    `;
    }
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
  note.status = "pending";
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
    emptyTab.style.display = "none";
  } else {
    emptyNote.style.display = "none";
    content.innerHTML = `
   ${notebook
     .map(
       (data) =>
         `
          <div class="note"  style = 'background-color: ${
            data.status === "read"
              ? "gray"
              : data.category === "home"
              ? colors[0]
              : data.category === "work"
              ? colors[1]
              : colors[2]
          }; text-decoration:${
           data.status === "pending"
             ? "none"
             : data.status === "read"
             ? "line-through"
             : ""
         }'>
            <div class="check-title">
              <div class="check">
                <img src=${
                  data.status === "pending"
                    ? "./assets/imagws/empty-checkbox.png"
                    : data.status === "read"
                    ? "./assets/imagws/fill-checkbox.png"
                    : ""
                } alt="" name = ${
           data.status === "pending"
             ? "checker"
             : data.status === "read"
             ? "checked"
             : ""
         }>
                <p class="note-title">${data.title}</p>
              </div>
              <div class="icons">
                <button class="editNote" onclick='editNote(${JSON.stringify(
                  data
                )})'>
                  <img name='edit' src="./assets/imagws/edit.png" alt="" />
                </button>
                <button class="trash" onclick='deleteNote(${JSON.stringify(
                  data
                )})'>
                  <img src="./assets/imagws/trash.png" alt="" />
                </button>
              </div>
            </div>
            <p class="note-content">${data.description}</p>
            <p class="date" style = 'text-decoration:${
              data.status === "pending"
                ? "none"
                : data.status === "read"
                ? "line-through"
                : ""
            }'>${data.date}</p>            
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
  if(notebook.length < 1){
    emptyNote.style.display = "flex"
  }
  else{
    emptyNote.style.display = "none"
    content.innerHTML = `
   ${notebook
     .map(
       (data) =>
         `
          <div class="note"  style = 'background-color: ${data.status === "read"? "gray": data.category === "home"? colors[0]: data.category === "work"? colors[1]: colors[2]}; text-decoration:${data.status === "pending"? "none": data.status === "read"? "line-through": ""}'>
            <div class="check-title">
              <div class="check">
                <img src=${data.status === "pending"? "./assets/imagws/empty-checkbox.png": data.status === "read"? "./assets/imagws/fill-checkbox.png": ""} alt="" name = ${data.status === "pending"? "checker": data.status === "read" ? "checked": ""}>
                <p class="note-title">${data.title}</p>
              </div>
              <div class="icons">
                <button class="editNote" onclick='editNote(${JSON.stringify(
                  data
                )})'>
                  <img name='edit' src="./assets/imagws/edit.png" alt="" />
                </button>
                <button class="trash" onclick='deleteNote(${JSON.stringify(
                  data
                )})'>
                  <img src="./assets/imagws/trash.png" alt="" />
                </button>
              </div>
            </div>
            <p class="note-content">${data.description}</p>
            <p class="date" style = 'text-decoration:${ data.status === "pending" ? "none" : data.status === "read"? "line-through": ""}'>${data.date}</p>            
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
  }
  if (event.target.name === "checker") {
    let x = event.target.parentElement.querySelector("p").textContent;
    let p = {};
    z = {};
    for (let i = 0; i < notebook.length; i++) {
      if (x === notebook[i].title) {
        p = notebook[i];
        p.status = "read";
        event.target.checked = true;
      }
    }
    const updatedNote = notebook.map((z) => {
      datum = {};
      if (Number(z.id) === Number(note.id)) {
        datum = { ...note, ...z };
      } else {
        datum = { ...z, ...z };
      }
      return datum;
    });
    console.log(updatedNote);
    localStorage.setItem("notebook", JSON.stringify(updatedNote));
    window.location.reload()

  }
  else if (event.target.name === "checked") {
    let x = event.target.parentElement.querySelector("p").textContent;
    let p = {};
    z = {};
    for (let i = 0; i < notebook.length; i++) {
      if (x === notebook[i].title) {
        p = notebook[i];
        p.status = "pending";
      }
    }
    const updatedNote = notebook.map((z) => {
      datum = {};
      if (Number(z.id) === Number(note.id)) {
        datum = {...note, ...z};
      } else {
        datum = { ...z, ...z };
      }
      return datum;
    });
    console.log(updatedNote);
    z
    localStorage.setItem("notebook", JSON.stringify(updatedNote));
    window.location.reload()
  }
});
// function add(event) {
//   let x = event.target.parentElement.querySelector("p").textContent;
//   let p = {};
//   z = {};
//   for (let i = 0; i < notebook.length; i++) {
//     if (x === notebook[i].title) {
//       p = notebook[i];
//       p.status = "read";
//     }
//   }
//   const updatedNote = notebook.map((z) => {
//     datum = {};
//     if (Number(z.id) === Number(note.id)) {
//       datum = { ...note, ...z };
//     } else {
//       datum = { ...z, ...z};
//     }
//     return datum;
//   });
//   console.log(updatedNote)
//   localStorage.setItem("notebook", JSON.stringify(updatedNote));
// }
// function remove(event) {
//   let x = event.target.parentElement.querySelector("p").textContent;
//   let p = {};
//   z = {};
//   for (let i = 0; i < notebook.length; i++) {
//     if (x === notebook[i].title) {
//       console.log("true");
//       p = notebook[i];
//       p.status = "pending";
//       z = { ...notebook[i], ...p };
//       break;
//     }
//   }
//   console.log(z);
//   const updatedNote = notebook.map((z) => {
//     datum = {};
//     if (Number(z.id) === Number(note.id)) {
//       datum = { ...note, ...z };
//     } else {
//       datum = { ...z, ...z };
//     }
//     return datum;
//   });
//   console.log(updatedNote);
//   localStorage.setItem("notebook", JSON.stringify(updatedNote));
// }
function updatenote() {
  const updatedNote = notebook.map((todo) => {
    datum = {};
    if (Number(todo.id) === Number(note.id)) {
      datum = { ...todo, ...note };
    } else {
      datum = { ...todo, ...todo };
      console.log("lo", datum);
    }
    return datum;
  });
  localStorage.setItem("notebook", JSON.stringify(updatedNote));
  // window.location.reload();
  update_modal.classList.remove("modal-activated");
}

function editNote(data) {
  updateModalContent.value = data.description;
  updateModalTitle.value = data.title;
  updateNoteType.value = data.category;
  note = data;
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
            data.status === "read"
              ? "gray"
              : data.category === "home"
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
    if (result == "") {
      alert("Note does not exist");
      window.location.reload();
    }
  }
}
search_notes.addEventListener("focus", hideIcon);
function hideIcon() {
  search_icon.style.display = "none";
}

const allNotesAmount = notebook.length;
const tasksDone = notebook.filter((note) => note.status === "read").length;
if(allNotesAmount === tasksDone){
  counter.innerHTML = `You have completed all notes`;
}
if(allNotesAmount === 0){
  counter.style.display = "none";
}
counter.innerHTML = `You have ${tasksDone}/${allNotesAmount} notes completed`;