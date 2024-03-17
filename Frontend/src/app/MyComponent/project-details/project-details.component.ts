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

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent implements OnInit {
  projectId!: string;

  approvedTeams: ApprovedTeam[] = [];
  clientFeedback: ClientFeedback[] = [];
  projectBudgets: ProjectBudget[] = [];
  projectDescriptions: ProjectDescription[] = [];
  
  constructor(
    private approvedTeamService: ApprovedTeamService,
    private clientFeedbackService: ClientFeedbackService,
    private projectBudgetService: ProjectBudgetService,
    private projectDescriptionService: ProjectDescriptionService,
    private route: ActivatedRoute
  ) {}



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
    });
  }
  
}





















































































