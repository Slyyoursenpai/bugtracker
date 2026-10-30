import { addBug, createBug, updateStatus } from "./bugService.js";
import type { Bug, Severity, BugStatus } from "./types.js";

const listElement = document.getElementById("bug-list");
if (!(listElement instanceof HTMLUListElement)) {
  throw new Error("Could not find #bug-list in the page");
}
const list: HTMLUListElement = listElement;

const form = document.getElementById("bug-form");
const titleInput = document.getElementById("title-input");
const descriptionInput = document.getElementById("description-input");
const severityInput = document.getElementById("severity-input");
const STATUSES: BugStatus[] = ["open", "in progress", "resolved", "closed", "duplicate"];

if (!(form instanceof HTMLFormElement)) {
  throw new Error("Could not find #bug-form in the page");
}
if (!(titleInput instanceof HTMLInputElement)) {
  throw new Error("Could not find #title-input in the page");
}
if (!(descriptionInput instanceof HTMLTextAreaElement)) {
  throw new Error("Could not find #description-input in the page");
}
if (!(severityInput instanceof HTMLSelectElement)) {
  throw new Error("Could not find #severity-input in the page");
}

function isSeverity(value: string): value is Severity {
  return value === "low" || value === "medium" || value === "high" || value === "critical";
}

let bugs: Bug[] = []

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

bugs = addBug(bugs, createBug(title, description, severity));
renderBugs();
form.reset();
});