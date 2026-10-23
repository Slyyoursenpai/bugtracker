type  Severity = "low" | "medium" | "high" | "critical";

type BugStatus = "open" | "in progress" | "resolved" | "closed" | "duplicate";

interface Bug {
    id: string;
    title: string;
    description: string;
    severity: Severity;
    status: BugStatus;
    createdAt: number;
    updatedAt: number;
}