export interface RiskProfile {
    projectId: string;
    riskType: number;
    severity: number;
    impact: number;
    description: string;
    remedialSteps: string;
    status: string;
    dateReceived: Date;
  }
  