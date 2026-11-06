import { addBug, createBug, updateStatus, deleteBug, editBug } from "./bugService.js";
import type { Bug, Severity, BugStatus } from "./types.js";

const listElement = document.getElementById("bug-list");
if (!(listElement instanceof HTMLUListElement)) {
  throw new Error("Could not find #bug-list in the page");
}
const list: HTMLUListElement = listElement;

const form = document.getElementById("bug-form");
const titleEl = document.getElementById("title-input");
const descriptionEl = document.getElementById("description-input");
const severityEl = document.getElementById("severity-input");
const STATUSES: BugStatus[] = ["open", "in progress", "resolved", "closed", "duplicate"];

if (!(form instanceof HTMLFormElement)) {
  throw new Error("Could not find #bug-form in the page");
}
if (!(titleEl instanceof HTMLInputElement)) {
  throw new Error("Could not find #title-input in the page");
}
if (!(descriptionEl instanceof HTMLTextAreaElement)) {
  throw new Error("Could not find #description-input in the page");
}
if (!(severityEl instanceof HTMLSelectElement)) {
  throw new Error("Could not find #severity-input in the page");
}

const titleInput: HTMLInputElement = titleEl;
const descriptionInput: HTMLTextAreaElement = descriptionEl;
const severityInput: HTMLSelectElement = severityEl;

function isSeverity(value: string): value is Severity {
  return value === "low" || value === "medium" || value === "high" || value === "critical";
}

let bugs: Bug[] = []
let editingId: string | null = null;

function renderBugs(): void {
  list.replaceChildren();
  for (const bug of bugs) {
    const item = document.createElement("li");
    item.className = "bug-item";

    const label = document.createElement("span");
    label.textContent = `${bug.title} (${bug.severity}) - ${bug.status}`;
    item.appendChild(label);

    const select = document.createElement("select");
    for (const status of STATUSES) {
      const option = document.createElement("option");
      option.value = status;
      option.textContent = status;
      option.selected = bug.status === status;
      select.appendChild(option);
    }

    select.addEventListener("change", () => {
      const value = select.value;
      if (!isStatus(value)) return;
      bugs = updateStatus(bugs, bug.id, value);
      renderBugs();
    });

    item.appendChild(select);
    list.appendChild(item);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      bugs = deleteBug(bugs, bug.id);
      renderBugs()
    });
    item.appendChild(deleteButton);

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      titleInput.value = bug.title;
      descriptionInput.value = bug.description;
      severityInput.value = bug.severity;
      editingId = bug.id;
    });
    item.appendChild(editButton);
  }
}

function isStatus(value: string): value is BugStatus {
  return value === "open" || value === "in progress" || value === "resolved" || value === "closed" || value === "duplicate";
}

form.addEventListener("submit", (event) => { 
  event.preventDefault();
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const severity = severityInput.value;

  if(!isSeverity(severity)) {
    return;
  }

//bugs = addBug(bugs, createBug(title, description, severity));
if (editingId === null){
  bugs = addBug(bugs, createBug(title, description, severity));
} else {
  bugs = editBug(bugs, editingId, {title, description, severity});
  editingId = null;
}
renderBugs();
form.reset();
});