import type {Bug, Severity, BugStatus} from './types';

const severityRank: Record<Severity, number> = {
    "low": 1,
    "medium": 2,
    "high": 3,
    "critical": 4
};   
/// creates a bug object with the given title, description, and severity. The status is set to "open" by default, and the createdAt and updatedAt timestamps are set to the current time.
function createBug(title: string, description: string, severity: Severity): Bug {
    const now = Date.now();
    return {
        id: crypto.randomUUID(),
        title,
        description,
        severity,
        status: "open",
        createdAt: now,
        updatedAt: now
    }
}
// addBug function that takes an array of bugs and a new bug object, and returns a new array with the new bug added to the end.
function addBug(bugs: Bug[], newBug: Bug): Bug[] {
    return [...bugs, newBug];
}
/// findBug function that takes an array of bugs and an id, and returns the bug object with the matching id, or undefined if no match is found.
function findBug(bugs: Bug[], id: string): Bug | undefined{
    return bugs.find((bug) => bug.id === id);
}
/// updateStatus function that takes an array of bugs, an id, and a new status, and returns a new array with the bug object with the matching id updated to the new status and updatedAt timestamp set to the current time.
function updateStatus(bugs: Bug[], id: string, status: BugStatus): Bug[] {
    return bugs.map((bug) => bug.id === id?{...bug, status, updatedAt: Date.now()}: bug);
}
/// deleteBug function that takes an array of bugs and an id, and returns a new array with the bug object with the matching id removed.
function deleteBug(bugs: Bug[], id: string): Bug[] {
    return bugs.filter((bug) => bug.id !== id);
}
/// editBug function that takes an array of bugs, an id, and an object with updated title, description, and severity, and returns a new array with the bug object with the matching id updated to the new values and updatedAt timestamp set to the current time.
function editBug(
  bugs: Bug[],
  id: string,
  updates: { title: string; description: string; severity: Severity }
): Bug[] {
  return bugs.map((bug) =>
    bug.id === id ? { ...bug, ...updates, updatedAt: Date.now() } : bug
  );
}
/// filterBugs function that takes an array of bugs, an optional status, and an optional severity, and returns a new array with the bug objects that match the given status and/or severity.
function filterBugs(
    bugs: Bug[],
    status?: BugStatus,
    severity?: Severity
): Bug[] {
    return bugs.filter((bug)=>{
        const matchesStatus = status === undefined || bug.status === status;
        const matchesSeverity = severity === undefined || bug.severity === severity;
        return matchesStatus && matchesSeverity;
    });
}
/// searchBugs function that takes an array of bugs and a query string, and returns a new array with the bug objects that have the query string in their title or description (case-insensitive).
function searchBugs(bugs: Bug[], query: string): Bug[] {
    const q = query.trim().toLowerCase();
    return bugs.filter((bug) => bug.title.toLowerCase().includes(q) || bug.description.toLowerCase().includes(q));
}
/// sortBugs function that takes an array of bugs and a sort key ("createdAt" or "severity"), and returns a new array with the bug objects sorted by the given key in descending order (newest first for createdAt, highest severity first for severity).
function sortBugs(bugs: Bug[], by: "createdAt" | "severity"): Bug[] {
  const copy = [...bugs];
  copy.sort((a, b) => {
    if (by === "severity") {
      return severityRank[b.severity] - severityRank[a.severity];
    }
    return b.createdAt - a.createdAt;
  });
  return copy;
}



///// demo run for test
/**const sample = createBug("Sample Bug", "This is a sample bug description.", "high");

const bugs: Bug[] = [];
const after = addBug(bugs, sample);
const changed = updateStatus(after, after[0].id, "resolved");
const removed = deleteBug(after, after[0].id); **/

/**const edited = editBug(after, after[0].id, {
  title: "New title",
  description: "Updated description",
  severity: "low",
}); **/

