import type {Bug, Severity, BugStatus} from './types';

const severityRank: Record<Severity, number> = {
    "low": 1,
    "medium": 2,
    "high": 3,
    "critical": 4
};   

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

function addBug(bugs: Bug[], newBug: Bug): Bug[] {
    return [...bugs, newBug];
}

function findBug(bugs: Bug[], id: string): Bug | undefined{
    return bugs.find((bug) => bug.id === id);
}

function updateStatus(bugs: Bug[], id: string, status: BugStatus): Bug[] {
    return bugs.map((bug) => bug.id === id?{...bug, status, updatedAt: Date.now()}: bug);
}

function deleteBug(bugs: Bug[], id: string): Bug[] {
    return bugs.filter((bug) => bug.id !== id);
}

function editBug(
  bugs: Bug[],
  id: string,
  updates: { title: string; description: string; severity: Severity }
): Bug[] {
  return bugs.map((bug) =>
    bug.id === id ? { ...bug, ...updates, updatedAt: Date.now() } : bug
  );
}

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

function searchBugs(bugs: Bug[], query: string): Bug[] {
    const q = query.trim().toLowerCase();
    return bugs.filter((bug) => bug.title.toLowerCase().includes(q) || bug.description.toLowerCase().includes(q));
}

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
const sample = createBug("Sample Bug", "This is a sample bug description.", "high");

const bugs: Bug[] = [];
const after = addBug(bugs, sample);
const changed = updateStatus(after, after[0].id, "resolved");
const removed = deleteBug(after, after[0].id);

/**const edited = editBug(after, after[0].id, {
  title: "New title",
  description: "Updated description",
  severity: "low",
}); **/

