import { addBug, createBug } from "./bugService.js";
import type { Bug, Severity, BugStatus } from "./types.js";

const listElement = document.getElementById("bug-list");
if (!(listElement instanceof HTMLUListElement)) {
  throw new Error("Could not find #bug-list in the page");
}
const list: HTMLUListElement = listElement;

const form = document.getElementById("bug-form");
const titleInput = document.getElementById("title-input");
const descriptionInput = document.getElementById("description-input");
const severitytInput = document.getElementById("severity-input");

if (!(form instanceof HTMLFormElement)) {
  throw new Error("Could not find #bug-form in the page");
}
if (!(titleInput instanceof HTMLInputElement)) {
  throw new Error("Could not find #title-input in the page");
}
if (!(descriptionInput instanceof HTMLTextAreaElement)) {
  throw new Error("Could not find #description-input in the page");
}
if (!(severitytInput instanceof HTMLSelectElement)) {
  throw new Error("Could not find #severity-input in the page");
}

function isSeverity(value: string): value is Severity {
  return value === "low" || value === "medium" || value === "high" || value === "critical";
}

form.addEventListener("submit", (event) => { 
  event.preventDefault();
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const severity = severitytInput.value;

  if(!isSeverity(severity)) {
    return;
  }
  
let bugs: Bug[] = []

function renderBugs(): void {
  list.replaceChildren();
  for (const bug of bugs) {
    const item = document.createElement("li");
    item.className = "bug-item";
    item.textContent = `${bug.title} — ${bug.severity} (${bug.status})`;
    list.appendChild(item);
  }
}

bugs = addBug(bugs, createBug(title, description, severity));
renderBugs();
form.reset();
});