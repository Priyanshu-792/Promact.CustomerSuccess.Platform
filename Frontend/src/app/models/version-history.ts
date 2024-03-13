export interface VersionHistory {
    projectId: string;
    changeType: string;
    changes: string;
    changeReason: string;
    revisionDate: Date;
    approvalDate: Date;
    approvedBy: string;
}
