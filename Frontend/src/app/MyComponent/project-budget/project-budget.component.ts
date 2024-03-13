import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewProject } from '../../models/new-project';
import { ProjectBudget } from '../../models/project-budget';
import { ProjectBudgetService } from '../../MyService/project-budget.service';
import { NewProjectService } from '../../MyService/new-project.service';

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
      // Call the service to create a new project budget entry
      this.projectBudgetService.createProjectBudget(this.budgetForm.value).subscribe(
        (response: any) => {
          // Handle success response if needed
          console.log('Project budget created successfully:', response);
          // Reset the form after successful submission
          this.budgetForm.reset({ projectId: this.projectId });
          this.loadProjectBudgets();
        },
        error => {
          // Handle error if needed
          console.error('Error creating project budget:', error);
        }
      );
    } else {
      // Form is invalid, handle accordingly
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
    // Similar logic as in client feedback component
    // Implement if needed
  }
}
