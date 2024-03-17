import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewProject } from '../../models/new-project';
import { EscalationMatrix } from '../../models/EscalationMatrix';
import { EscalationMatrixService } from '../../MyService/escalation-matrix.service';
import { NewProjectService } from '../../MyService/new-project.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-escalation-matrix',
  templateUrl: './escalation-matrix.component.html',
  styleUrl: './escalation-matrix.component.css'
})
export class EscalationMatrixComponent implements OnInit {
  @Input() projectId!: string;
  matrixForm!: FormGroup;
  projects: NewProject[] = [];
  escalationMatrix: EscalationMatrix[] = [];
  pName!: string;

  constructor(
    private formBuilder: FormBuilder,
    private escalationMatrixService: EscalationMatrixService,
    private newProjectService: NewProjectService
  ) { }

  ngOnInit(): void {
    // Initialize the matrix form
    this.matrixForm = this.formBuilder.group({
      projectId: [this.projectId, Validators.required],
      name: ['', Validators.required],
      level: ['', Validators.required],
      escalationType: ['', Validators.required],
      Role: ['', Validators.required]
    });

    // Load projects for dropdown
    this.loadProjects();
    this.loadEscalationMatrix();
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
    if (this.matrixForm.valid) {
      this.escalationMatrixService.createEscalationMatrix(this.matrixForm.value).subscribe(
        (response: any) => {
          console.log('Escalation matrix created successfully:', response);
          this.matrixForm.reset({ projectId: this.projectId });
          this.loadEscalationMatrix();
        },
        error => {
          console.error('Error creating escalation matrix:', error);
        }
      );
    } else {
      // Form is invalid, handle accordingly
    }
  }



  loadEscalationMatrix(): void {
    this.escalationMatrixService.getAllEscalationMatrixEntries().subscribe(
      (data: any) => {
        this.escalationMatrix = data.items.filter((Matrix: EscalationMatrix) => Matrix.projectId === this.projectId);
      },
      error => {
        console.error('Error loading client feedbacks:', error);
      }
    );
  }

  downloadMatrixAsPdf(): void {
    const doc = new jsPDF();
    let yOffset = 10;

    // Add project details
    doc.text(`Project Name: ${this.pName}`, 10, yOffset);
    yOffset += 10;
    // Add escalation matrix details
    this.escalationMatrix.forEach(matrix => {
      doc.text(`Name: ${matrix.name}`, 10, yOffset);
      doc.text(`Level: ${matrix.level}`, 10, yOffset + 10);
      doc.text(`Escalation Type: ${matrix.escalationType}`, 10, yOffset + 20);
      doc.text(`Role: ${matrix.Role}`, 10, yOffset + 30);
      yOffset += 50; 
    });

    doc.save(`Escalation_Matrix_${this.pName}.pdf`);
  }

}









