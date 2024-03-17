import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApprovedTeam } from '../../models/approved-team';
import { ClientFeedback } from '../../models/client-feedback';
import jsPDF from 'jspdf';
import { ProjectDescription } from '../../models/project-description';
import { ProjectBudget } from '../../models/project-budget';
import { ApprovedTeamService } from '../../MyService/approved-team.service';
import { ClientFeedbackService } from '../../MyService/client-feedback.service';
import { ProjectBudgetService } from '../../MyService/project-budget.service';
import { ProjectDescriptionService } from '../../MyService/project-description.service';
import { forkJoin } from 'rxjs';
import { Resource } from '../../models/resources';
import { ProjectUpdates } from '../../models/project-updates';
import { MeetingMinute } from '../../models/meeting-minute';
import { AuditHistory } from '../../models/audit-history';
import { VersionHistory } from '../../models/version-history';
import { Scope } from '../../models/scope';
import { EscalationMatrix } from '../../models/EscalationMatrix';
import { Stakeholder } from '../../models/stake-holders';
import { RiskProfile } from '../../models/risk-profile';
import { PhaseMilestone } from '../../models/phase-milestone';
import { Sprint } from '../../models/sprint';
import { ResourcesService } from '../../MyService/resources.service';
import { ProjectUpdatesService } from '../../MyService/project-updates.service';
import { MeetingMinuteService } from '../../MyService/meeting-minute.service';
import { AuditHistoryService } from '../../MyService/audit-history.service';
import { StakeHoldersService } from '../../MyService/stake-holders.service';
import { RiskProfileService } from '../../MyService/risk-profile.service';
import { VersionHistoryService } from '../../MyService/version-history.service';
import { ScopeService } from '../../MyService/scope.service';
import { EscalationMatrixService } from '../../MyService/escalation-matrix.service';
import { SprintService } from '../../MyService/sprint.service';
import 'jspdf-autotable';
import { NewProjectService } from '../../MyService/new-project.service';
import { NewProject } from '../../models/new-project';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css',
})
export class ProjectDetailsComponent implements OnInit {
  projectId!: string;

  projectDescriptions: ProjectDescription[] = [];
  approvedTeams: ApprovedTeam[] = [];
  clientFeedbacks: ClientFeedback[] = [];
  projectBudgets: ProjectBudget[] = [];
  resources: Resource[] = [];
  projectUpdates: ProjectUpdates[] = [];
  moms: MeetingMinute[] = [];
  auditHistory: AuditHistory[] = [];
  version: VersionHistory[] = [];
  scope: Scope[] = [];
  escalation: EscalationMatrix[] = [];
  stakeHolder: Stakeholder[] = [];
  risk: RiskProfile[] = [];
  phases: PhaseMilestone[] = [];
  sprint: Sprint[] = [];
  projects: NewProject[] = [];

  constructor(
    private approvedTeamService: ApprovedTeamService,
    private clientFeedbackService: ClientFeedbackService,
    private projectBudgetService: ProjectBudgetService,
    private projectDescriptionService: ProjectDescriptionService,
    private resourceService: ResourcesService,
    private projectUpdateService: ProjectUpdatesService,
    private meetingServics: MeetingMinuteService,
    private auditService: AuditHistoryService,
    private stakeHolderService: StakeHoldersService,
    private riskProfileService: RiskProfileService,
    private versionHistoryServcie: VersionHistoryService,
    private scopeService: ScopeService,
    private EscalationMatrixService: EscalationMatrixService,
    private sprintService: SprintService,
    private newProjectService: NewProjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectId = params['id'];
    });
  }



  downloadAsPdf()
  {
    this.approvedTeamService.getAllApprovedTeams().subscribe(
      (response: any) => {
        console.log('All approved teams:', response.items);
        this.approvedTeams = response.items;
        this.approvedTeams = this.approvedTeams.filter(team => team.projectId === this.projectId);
        this.resourceService.getAllResources().subscribe(
          (response: any) => {
            console.log('resource items', response);
            this.resources = response.items;
            this.resources = this.resources.filter(team => team.projectId === this.projectId);
            this.clientFeedbackService.getAllClientFeedbacks().subscribe(
              (response: any) => {
                console.log('feedback items', response);
                this.clientFeedbacks = response.items;
                this.clientFeedbacks = this.clientFeedbacks.filter((item) => item.projectId === this.projectId);
                this.projectUpdateService.getAllProjectUpdates().subscribe(
                  (response: any) => {
                    console.log('all project feedbacks', response);
                    this.projectUpdates = response.items;
                    this.projectUpdates = this.projectUpdates.filter(((item) => item.projectId === this.projectId));
                    this.projectBudgetService.getAllProjectBudgets().subscribe(
                      (response: any) => {
                        console.log('all project budget', response);
                        this.projectBudgets = response.items;
                        this.projectBudgets = this.projectBudgets.filter(((item) => item.projectId === this.projectId));
                        this.meetingServics.getAllMeetingMinutes().subscribe(
                          (response: any) => {
                            console.log('all meetings', response);
                            this.moms = response.items;
                            this.moms = this.moms.filter((item) => item.projectId === this.projectId);
                            this.auditService.getAllAuditHistory().subscribe(
                              (response: any) => {
                                console.log('all audits', response);
                                this.auditHistory = response.items;
                                this.auditHistory = this.auditHistory.filter((item) => item.projectId === this.projectId);
                              
                                this.projectDescriptionService.getAllProjectDescriptions().subscribe(
                                  (response: any) => {
                                    
                                    this.projectDescriptions = response.items;
                                    this.projectDescriptions = this.projectDescriptions.filter((item) => item.projectId === this.projectId);
                        
                                    this.stakeHolderService.getAllStakeholders().subscribe(
                                      (response: any) => {
                                        
                                        this.stakeHolder = response.items;
                                        this.stakeHolder = this.stakeHolder.filter((item) => item.projectId === this.projectId);
                            
                                        this.versionHistoryServcie.getAllVersionHistory().subscribe(
                                          (response: any) => {
                                            
                                            this.version = response.items;
                                            this.version = this.version.filter((item) => item.projectId === this.projectId);
                                            this.riskProfileService.getAllRiskProfiles().subscribe(
                                              (response: any) => {
                                                
                                                this.risk = response.items;
                                                this.risk = this.risk.filter((item) => item.projectId === this.projectId);
                                                this.scopeService.getAllScopes().subscribe(
                                                  (response: any) => {
                                                    
                                                    this.scope = response.items;
                                                    this.scope = this.scope.filter((item) => item.projectId === this.projectId);
                                                    this.EscalationMatrixService.getAllEscalationMatrixEntries().subscribe(
                                                      (response: any) => {
                                                        
                                                        this.escalation = response.items;
                                                        this.escalation = this.escalation.filter((item) => item.projectId === this.projectId);
                                                        this.sprintService.getAllSprints().subscribe(
                                                          (response: any) => {
                                                            
                                                            this.sprint = response.items;
                                                            this.sprint = this.sprint.filter((item) => item.projectId === this.projectId);
                                                            this.generatePdf();
                            
                                                          },
                                                          error => {
                                                            console.error('Error ', error);
                                                          }
                                                        )
                        
                                                      },
                                                      error => {
                                                        console.error('Error', error);
                                                      }
                                                    )
                    
                                                  },
                                                  error => {
                                                    console.error('', error);
                                                  }
                                                )
                
                                              },
                                              error => {
                                                console.error('', error);
                                              }
                                            )
                                          },
                                          error => {
                                            console.error('Error', error);
                                          }
                                        )
        
                                      },
                                      error => {
                                        console.error('Error', error);
                                      }
                                    )
    
                                  },
                                  error => {
                                    console.error('Error', error);
                                  }
                                )
                              },
                              error => {
                                console.error('Error', error);
                              }
                            )
                          },
                          error => {
                            console.error('Error ', error);
                          }
                        )
                      
                      },
                      error => {
                        console.error('Error:', error);
                      }
                    )

                  },
                  error => {
                    console.error('Error:', error);
                  }
                )
              
              },
              error => {
                console.error('Error:', error);
              }
            )
            
          },
          error => {
            console.error('Error:', error);
          }
        );
      },
      error => {
        console.error('Error:', error);
      }
    );
  }


generatePdf(): void {
  const doc = new jsPDF();
  let yPos = 20;
//starts
if (this.projectBudgets && this.projectBudgets.length > 0) {
  const budgetHeaders = [ 'Type', 'Duration (Months)', 'Contract Duration', 'Budgeted Hours', 'Budgeted Cost', 'Currency', 'Comment'];
  const budgetData = this.projectBudgets.map(budget => [
    budget.type,
    budget.durationInMonths,
    budget.contractDuration,
    budget.budgetedHours,
    budget.budgetedCost,
    budget.currency,
    budget.comment
  ]);
  yPos = this.printSection(doc, 'Project Budgets', budgetHeaders, budgetData, yPos);
} else {
  doc.setFontSize(12);
  doc.text('No project budgets available.', 10, yPos);
  yPos += 20; // Adjust vertical spacing
}

yPos += 10; 


if (this.auditHistory && this.auditHistory.length > 0) {
  const auditHeaders = [ 'Date of Audit', 'Reviewed By', 'Status', 'Reviewed Section', 'Comment or Queries', 'Action Item'];
  const auditData = this.auditHistory.map(audit => [
    audit.dateOfAudit, 
    audit.reviewedBy,
    audit.status,
    audit.reviewedSection,
    audit.commentOrQueries,
    audit.actionItem
  ]);
  yPos = this.printSection(doc, 'Audit History', auditHeaders, auditData, yPos);
} else {
  doc.setFontSize(12);
  doc.text('No audit history available.', 10, yPos);
  yPos += 20; 
}

yPos += 10; 

  
if (this.version && this.version.length > 0) {
  const versionHeaders = [ 'Change Type', 'Changes', 'Change Reason', 'Revision Date', 'Approval Date', 'Approved By'];
  const versionData = this.version.map(version => [
    version.changeType,
    version.changes,
    version.changeReason,
    version.revisionDate,  
    version.approvedBy
  ]);
  yPos = this.printSection(doc, 'Version History', versionHeaders, versionData, yPos);
} else {
  doc.setFontSize(12);
  doc.text('No version history available.', 10, yPos);
  yPos += 20; 
}

yPos += 10; // Additional vertical spacing


  if (this.projectDescriptions && this.projectDescriptions.length > 0) {
    const descriptionHeaders = ['Description'];
    const descriptionData = this.projectDescriptions.map(description => [
      description.description
    ]);
    yPos = this.printSection(doc, 'Project Descriptions', descriptionHeaders, descriptionData, yPos);
  } else {
    doc.setFontSize(12);
    doc.text('No project descriptions available.', 10, yPos);
    yPos += 20; }
  yPos += 10; 
  


  
  if (this.scope && this.scope.length > 0) {
    const scopeHeaders = [ 'Technology', 'Scope Details'];
    const scopeData = this.scope.map(scope => [
      scope.technology,
      scope.scopeDetails
    ]);
    yPos = this.printSection(doc, 'Project Scopes', scopeHeaders, scopeData, yPos);
  } else {
    doc.setFontSize(12);
    doc.text('No project scopes available.', 10, yPos);
    yPos += 20; 
  }
  
  yPos += 10; 
  


  if (this.escalation && this.escalation.length > 0) {
    const escalationHeaders = [ 'Name', 'Level', 'Escalation Type', 'Role'];
    const escalationData = this.escalation.map(escalation => [
      escalation.name,
      escalation.level,
      escalation.escalationType,
      escalation.Role
    ]);
    yPos = this.printSection(doc, 'Escalation Matrices', escalationHeaders, escalationData, yPos);
  } else {
    doc.setFontSize(12);
    doc.text('No escalation matrices available.', 10, yPos);
    yPos += 20; 
  }
  
  yPos += 10; 
  

  if (this.stakeHolder && this.stakeHolder.length > 0) {
    const stakeholderHeaders = [ 'Title', 'Name', 'Contact'];
    const stakeholderData = this.stakeHolder.map(stakeholder => [
      stakeholder.title,
      stakeholder.name,
      stakeholder.contact
    ]);
    yPos = this.printSection(doc, 'Stakeholders', stakeholderHeaders, stakeholderData, yPos);
  } else {
    doc.setFontSize(12);
    doc.text('No stakeholders available.', 10, yPos);
    yPos += 20; 
  }
  
  yPos += 10; 

  
  if (this.risk && this.risk.length > 0) {
    const riskHeaders = [ 'Risk Type', 'Severity', 'Impact', 'Description', 'Remedial Steps', 'Status', 'Date Received'];
    const riskData = this.risk.map(risk => [
      risk.riskType,
      risk.severity,
      risk.impact,
      risk.description,
      risk.remedialSteps,
      risk.status,
      risk.dateReceived 
    ]);
    yPos = this.printSection(doc, 'Risk Profiles', riskHeaders, riskData, yPos);
  } else {
    doc.setFontSize(12);
    doc.text('No risk profiles available.', 10, yPos);
    yPos += 20; 
  }
  
  yPos += 10;
  

  if (this.phases && this.phases.length > 0) {
    const milestoneHeaders = [ 'Title', 'Start Date', 'End Date', 'Approval Date', 'Status', 'Revised Completion Date', 'Comments'];
    const milestoneData = this.phases.map(milestone => [
      milestone.title,
      milestone.startDate, 
      milestone.endDate, 
      milestone.approvalDate, 
      milestone.status,
      milestone.revisedCompletionDate,
      milestone.comments
    ]);
    yPos = this.printSection(doc, 'Phase Milestones', milestoneHeaders, milestoneData, yPos);
  } else {
    doc.setFontSize(12);
    doc.text('No phase milestones available.', 10, yPos);
    yPos += 20; 
  }
  
  yPos += 10; 


  if (this.sprint && this.sprint.length > 0) {
    const sprintHeaders = ['Sprint Number', 'Start Date', 'End Date', 'Status', 'Comments', 'Goals'];
    const sprintData = this.sprint.map(sprint => [
      sprint.sprintNumber,
      sprint.startDate, 
      sprint.endDate,
      sprint.status,
      sprint.comments,
      sprint.goals
    ]);
    yPos = this.printSection(doc, 'Sprints', sprintHeaders, sprintData, yPos);
  } else {
    doc.setFontSize(12);
    doc.text('No sprints available.', 10, yPos);
    yPos += 20; 
  }
  
  yPos += 10;
  
  


  // Print approved teams section
  if (this.approvedTeams && this.approvedTeams.length > 0) {
    const approvedTeamHeaders = [ 'Phase', 'Number of Resources', 'Role', 'Availability Percentage', 'Duration'];
    const approvedTeamData = this.approvedTeams.map(team => [
      team.phase,
      team.numberOfResources,
      team.role,
      team.availabilityPercentage,
      team.duration
    ]);
    yPos = this.printSection(doc, 'Approved Teams', approvedTeamHeaders, approvedTeamData, yPos);
  } else {
    doc.setFontSize(12);
    doc.text('No content available here', 10, yPos);
    yPos += 20; 
  }

  yPos += 10;

  yPos += 10;

  // Print resources section
  if (this.resources && this.resources.length > 0) {
    const resourceHeaders = ['Allocation Percentage', 'Start', 'End', 'Role'];
    const resourceData = this.resources.map(resource => [
      resource.allocationPercentage,
      resource.start,
      resource.end,
      resource.role
    ]);
    yPos = this.printSection(doc, 'Resources', resourceHeaders, resourceData, yPos);
  } else {
    doc.setFontSize(12);
    doc.text('No content available here', 10, yPos);
    yPos += 20; 
  }

  
  

  if (this.clientFeedbacks && this.clientFeedbacks.length > 0) {
    const feedbackHeaders = [ 'Feedback Type', 'Date Received', 'Detailed Feedback', 'Action Taken', 'Closure Date'];
    const feedbackData = this.clientFeedbacks.map(feedback => [
      feedback.feedbackType,
      feedback.dateReceived, 
      feedback.detailedFeedback,
      feedback.actionTaken,
      feedback.closureDate 
    ]);
    yPos = this.printSection(doc, 'Client Feedback', feedbackHeaders, feedbackData, yPos);
  } else {
    doc.setFontSize(12);
    doc.text('No client feedback available.', 10, yPos);
    yPos += 20; 
  }




  if (this.projectUpdates && this.projectUpdates.length > 0) {
    const updatesHeaders = [ 'Date', 'General Updates'];
    const updatesData = this.projectUpdates.map(update => [
      update.date, 
      update.generalUpdates
    ]);
    yPos = this.printSection(doc, 'Project Updates', updatesHeaders, updatesData, yPos);
  } else {
    doc.setFontSize(12);
    doc.text('No project updates available.', 10, yPos);
    yPos += 20; 
  }
  
  yPos += 10; // Additional vertical spacing
  

  if (this.moms && this.moms.length > 0) {
    const minuteHeaders = [ 'Meeting Date', 'Duration', 'MoM Link', 'Comments'];
    const minuteData = this.moms.map(minute => [
      minute.meetingDate, 
      minute.duration,
      minute.MoMLink,
      minute.comments
    ]);
    yPos = this.printSection(doc, 'Meeting Minutes', minuteHeaders, minuteData, yPos);
  } else {
    doc.setFontSize(12);
    doc.text('No meeting minutes available.', 10, yPos);
    yPos += 20; 
  }
  
  yPos += 10; 
  



//ends
yPos += 10; 


  doc.save('project_details.pdf');
}
printSection(doc: any, title: string, headers: string[], data: any[][], yPos: number): number {
  const startY = yPos;

  // Print section title
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(title, 10, yPos);
  yPos += 10;

  // Check if there is any data to display
  if (data.length > 0) {
   
    const tableData = [headers, ...data];
    
    // Generate table
    doc.autoTable({
      startY: yPos,
      head: [tableData[0]], 
      body: tableData.slice(1), // Data
      theme: 'grid', 
      styles: {
        fontSize: 10,
        textColor: [0, 0, 0], 
        lineWidth: 0.1, 
        lineColor: [0, 0, 0]
      },
      columnStyles: { 0: { fontStyle: 'bold' } }, 
      margin: { left: 10, right: 10 } 
    });

    
    const tableHeight = doc.autoTable.previous.finalY - startY;

    
    yPos += tableHeight + 10; 
  } else {
   
    doc.setFontSize(12);
    doc.text('No content available here', 10, yPos);
    yPos += 20;
  }

  
  yPos += 10; 

  return yPos;
}





}
