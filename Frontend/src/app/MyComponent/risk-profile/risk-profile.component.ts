import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewProject } from '../../models/new-project';
import { RiskProfile } from '../../models/risk-profile';
import { RiskProfileService } from '../../MyService/risk-profile.service';
import { NewProjectService } from '../../MyService/new-project.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-risk-profile',
  templateUrl: './risk-profile.component.html',
  styleUrl: './risk-profile.component.css'
})
export class RiskProfileComponent implements OnInit{
  @Input() projectId!: string;
  riskForm!: FormGroup;
  projects: NewProject[] = [];
  riskProfiles: RiskProfile[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private riskProfileService: RiskProfileService,
    private newProjectService: NewProjectService
  ) { }

  ngOnInit(): void {
    this.riskForm = this.formBuilder.group({
      projectId: [this.projectId, Validators.required],
      riskType: ['', Validators.required],
      severity: ['', Validators.required],
      impact: ['', Validators.required],
      description: ['', Validators.required],
      remedialSteps: ['', Validators.required],
      status: ['', Validators.required],
      dateReceived: ['', Validators.required]
    });

    this.loadProjects();
    this.loadRiskProfiles();
  }

  pName!: string;

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
    if (this.riskForm.valid) {
      this.riskProfileService.createRiskProfile(this.riskForm.value).subscribe(
        (response: any) => {
          console.log('Risk profile created successfully:', response);
          this.riskForm.reset({ projectId: this.projectId });
          this.loadRiskProfiles();
        },
        error => {
          console.error('Error creating risk profile:', error);
        }
      );
    } else {
      // Form is invalid, handle accordingly
    }
  }

  loadRiskProfiles(): void {
    this.riskProfileService.getAllRiskProfiles().subscribe(
      (data: any) => {
        this.riskProfiles = data.items.filter((risk: RiskProfile) => risk.projectId === this.projectId);
      },
      error => {
        console.error('Error loading risk profiles:', error);
      }
    );
  }

  downloadAsPdf() {
    this.riskProfileService.getAllRiskProfiles().subscribe((data: any) => {
      console.log('Received risk profiles data:', data);

      const riskProfileData: RiskProfile[] = data.items.map((risk: any) => ({
        projectId: risk.projectId,
        riskType: risk.riskType,
        severity: risk.severity,
        impact: risk.impact,
        description: risk.description,
        remedialSteps: risk.remedialSteps,
        status: risk.status,
        dateReceived: new Date(risk.dateReceived)
      }));

      const filteredRiskProfiles = riskProfileData.filter(risk => risk.projectId === this.projectId);

      if (filteredRiskProfiles.length === 0) {
        console.log('No risk profiles found for the specified project ID.');
        return;
      }

      const doc = new jsPDF();
      let yOffset = 10;
      let currentPage = 1;
      const maxPageHeight = doc.internal.pageSize.height - 20;

      filteredRiskProfiles.forEach(risk => {
        if (yOffset + 50 > maxPageHeight) {
          doc.addPage();
          yOffset = 10;
          currentPage++;
        }

        doc.text(`Risk Type: ${risk.riskType}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Severity: ${risk.severity}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Impact: ${risk.impact}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Description: ${risk.description}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Remedial Steps: ${risk.remedialSteps}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Status: ${risk.status}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Date Received: ${risk.dateReceived.toLocaleDateString()}`, 20, yOffset);
        yOffset += 10;
        yOffset += 10;
      });

      doc.save(`Risk_profiles_of_${currentPage}Pages.pdf`);
    }, error => {
      console.error('Error fetching risk profiles:', error);
    });
  }

}
