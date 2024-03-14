export interface PhaseMilestone {
    projectId: string;
    title: string;
    startDate: Date;
    endDate: Date;
    approvalDate: Date;
    status: number;
    revisedCompletionDate: Date;
    comments: string;
  }
  