export interface ApprovedTeam {
    projectId: string;
    phase: number;
    numberOfResources: number;
    role: string;
    availabilityPercentage: number;
    duration: number;
  }