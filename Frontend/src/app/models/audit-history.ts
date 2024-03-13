export interface AuditHistory {
    projectId: string;
    dateOfAudit: Date;
    reviewedBy: string;
    status: string;
    reviewedSection: string;
    commentOrQueries: string;
    actionItem: string;
  }
  