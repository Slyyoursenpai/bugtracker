export type Severity = "low" | "medium" | "high" | "critical";

export type BugStatus = "open" | "in progress" | "resolved" | "closed" | "duplicate";

export interface Bug {
    id: string;
    title: string;
    description: string;
    severity: Severity;
    status: BugStatus;
    createdAt: number;
    updatedAt: number;
}