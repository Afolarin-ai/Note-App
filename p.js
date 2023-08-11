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

const colored = document.querySelector(".colored");

const progressBar = document.querySelector(".progress-bar");

const edit = document.querySelector(".editNote");

let add_note_type = document.querySelector(".add-note-type");

let updateNoteType = document.querySelector(".update-note-type");

const emptyNote = document.querySelector(".empty-notes");

let noteCard = document.querySelector(".note");

const noteContent = document.querySelector(".note-content");

const noteTitle = document.querySelector(".note-title");

const tabs = document.querySelectorAll(".tab");

const emptyTab = document.querySelector(".empty-tab");

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

addNewNote.addEventListener("click", add_date);

let title;


function activateModal() {
  add_modal.classList.add("modal-activated");
}

function closeModal() {
  add_modal.classList.remove("modal-activated");
  update_modal.classList.remove("modal-activated");
  note_content.reset;
  note_title.clear;
}

async function fetchData() {
  try {
    const response = await fetch(
      "https://task-manager-oj3y.onrender.com/api/task"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
fetchData()

function add_date() {}