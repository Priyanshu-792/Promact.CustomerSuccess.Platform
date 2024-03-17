import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewProject } from '../../models/new-project';
import { ProjectBudget } from '../../models/project-budget';
import { ProjectBudgetService } from '../../MyService/project-budget.service';
import { NewProjectService } from '../../MyService/new-project.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-project-budget',
  templateUrl: './project-budget.component.html',
  styleUrl: './project-budget.component.css'
})
export class ProjectBudgetComponent {
  @Input() projectId!: string;
  budgetForm!: FormGroup;
  projects: NewProject[] = [];
  projectBudgets: ProjectBudget[] = [];
  pName!: string;

  constructor(
    private formBuilder: FormBuilder,
    private projectBudgetService: ProjectBudgetService,
    private newProjectService: NewProjectService
  ) { }

  ngOnInit(): void {
    // Initialize the budget form
    this.budgetForm = this.formBuilder.group({
      projectId: [this.projectId, Validators.required],
      type: ['', Validators.required],
      durationInMonths: ['', Validators.required],
      contractDuration: ['', Validators.required],
      budgetedHours: ['', Validators.required],
      budgetedCost: ['', Validators.required],
      currency: ['', Validators.required],
      comment: ['']
    });

    // Load projects for dropdown
    this.loadProjects();
    this.loadProjectBudgets();
  }

  loadProjects(): void {
    this.newProjectService.getAllProjects('project').subscribe(
      (data: any) => {
        this.projects = data.items.map((project: any) => ({
          id: project.id,
          projectName: project.name
        }));

        this.projects.forEach((project: any) => {
          if (project.id === this.projectId) {
            this.pName = project.projectName;
          }
        });
      },
      error => {
        console.error('Error loading projects:', error);
      }
    );
  }

  onSubmit() {
    if (this.budgetForm.valid) {
      this.projectBudgetService.createProjectBudget(this.budgetForm.value).subscribe(
        (response: any) => {
          console.log('Project budget created successfully:', response);
          this.budgetForm.reset({ projectId: this.projectId });
          this.loadProjectBudgets();
        },
        error => {
          console.error('Error creating project budget:', error);
        }
      );
    } else {
    }
  }

  loadProjectBudgets(): void {
    this.projectBudgetService.getAllProjectBudgets().subscribe(
      (data: any) => {
        this.projectBudgets = data.items.filter((budget: ProjectBudget) => budget.projectId === this.projectId);
      },
      error => {
        console.error('Error loading project budgets:', error);
      }
    );
  }


// Download as PDF
downloadAsPdf() {
  if (this.projectBudgets.length === 0) {
    console.log('No project budgets found for the specified project ID.');
    return;
  }

  const doc = new jsPDF();
  let yOffset = 10;
  let currentPage = 1;
  const maxPageHeight = doc.internal.pageSize.height - 20;

  this.projectBudgets.forEach(budget => {
    if (yOffset + 50 > maxPageHeight) {
      doc.addPage();
      yOffset = 10;
      currentPage++;
    }

    // Add budget details
    doc.text(`Type: ${budget.type}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Duration (Months): ${budget.durationInMonths}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Contract Duration: ${budget.contractDuration}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Budgeted Hours: ${budget.budgetedHours}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Budgeted Cost: ${budget.budgetedCost}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Currency: ${budget.currency}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Comment: ${budget.comment}`, 20, yOffset);
    yOffset += 10;
    yOffset += 10; // Add spacing between budget entries
  });

  doc.save(`Project_budget_for_${currentPage}Pages.pdf`);
}

}
