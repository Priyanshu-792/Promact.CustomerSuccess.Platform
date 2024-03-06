export interface ClientFeedback {
    projectId: string;
    feedbackType: string;
    dateReceived: Date;
    detailedFeedback: string;
    actionTaken: string;
    closureDate: Date;
  }