export interface ProjectBudget {
    projectId: string;
    type:string ;
    durationInMonths: number;
    contractDuration: number;
    budgetedHours: number;
    budgetedCost: number;
    currency: string;
    comment: string;
  }