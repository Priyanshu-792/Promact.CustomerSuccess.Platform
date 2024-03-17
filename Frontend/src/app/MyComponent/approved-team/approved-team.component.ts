
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApprovedTeamService } from '../../MyService/approved-team.service';
import { NewProjectService } from '../../MyService/new-project.service';
import jsPDF from 'jspdf';
import { ApprovedTeam } from '../../models/approved-team';
import { EmailService } from '../../MyService/email.service';
import { StakeHoldersService } from '../../MyService/stake-holders.service';
import { Stakeholder } from '../../models/stake-holders';
import { Email } from '../../models/email';
@Component({
  selector: 'app-approved-team',
  templateUrl: './approved-team.component.html',
  styleUrl: './approved-team.component.css'
})
export class ApprovedTeamComponent implements OnInit{
@Input() projectId!: string; // Define projectId property
approvedTeams: ApprovedTeam[] = [];
stakeholders: Stakeholder[]=[];
  resourceForm!: FormGroup;
  projectPlaceholder!: string;
  projects: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private approvedTeamService: ApprovedTeamService,
    private projectService: NewProjectService,
    private emailService: EmailService,
    private stakeholderService: StakeHoldersService
  ) { }

  ngOnInit(): void {
    this.resourceForm = this.formBuilder.group({
      projectId: [this.projectId, Validators.required], // Use projectId in the value
      phase: ['', Validators.required],
      numberOfResources: [0, Validators.required],
      role: ['', Validators.required],
      availabilityPercentage: [0, Validators.required],
      duration: [0, Validators.required]
    });
    
    this.loadProjects();
    this.loadApprovedTeams();
    this.loadStakeholders();
    
    
  }
pName!:string;
  loadProjects(): void {
    this.projectService.getAllProjects('project').subscribe(
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

  onSubmit(): void {
    if (this.resourceForm.valid) {
      const formData = this.resourceForm.value;
      this.approvedTeamService.createApprovedTeam(formData).subscribe(
        (response: any) => {
          console.log('Approved team created successfully:', response);
          this.resourceForm.reset({ projectId: this.projectId });
          this.loadApprovedTeams();
          this.sendNotification(formData);
        },
        (error: any) => {
          console.error('Error creating approved team:', error);
        }
      );
    } else {
      console.error('Form is invalid.');
    }
  }


//displaying approved team table here
loadApprovedTeams(): void {
  this.approvedTeamService.getAllApprovedTeams().subscribe(
    (data: any) => {
      this.approvedTeams = data.items.filter((team: ApprovedTeam) => team.projectId === this.projectId);
      this.approvedTeams.sort((a, b) => a.phase - b.phase);
    },
    error => {
      console.error('Error loading approved teams:', error);
    }
  );
}

  loadStakeholders(): void {
    this.stakeholderService.getAllStakeholders().subscribe(
      (data: any) => {
     
        this.stakeholders = data.items.filter((stakeholder: Stakeholder) => stakeholder.projectId === this.projectId);
  
        console.log('Stakeholders:', this.stakeholders);
      },
      (error) => {
        console.error('Error loading stakeholders:', error);
      }
    );
  }
  

  sendNotification(formData: any): void {
    const subject = 'Approved team is created';
    // Iterate over each stakeholder and send individual notifications
    this.stakeholders.forEach((stakeholder: Stakeholder) => {
      const stakeholderName = stakeholder.name;
      const body = `
      <div class="email-body">
        <div class="email-header">
          <h2>Hello ${stakeholderName},</h2>
    
          <p>Please note that the approved team has been updated. Here is the summary:</p>
    
          <table class="email-table">
            <tr>
              <td>Project Name:</td>
              <td>${this.pName}</td>
            </tr>
            <tr>
              <td>Phase:</td>
              <td>${formData.phase}</td>
            </tr>
            <tr>
              <td>Number of Resources:</td>
              <td>${formData.numberOfResources}</td>
            </tr>
            <tr>
              <td>Role:</td>
              <td>${formData.role}</td>
            </tr>
            <tr>
              <td>Availability Percentage:</td>
              <td>${formData.availabilityPercentage}%</td>
            </tr>
            <tr>
              <td>Duration:</td>
              <td>${formData.duration} months</td>
            </tr>
          </table>
          
          <p class="email-footer">For more details, visit our official website: <a href="https://promactinfo.com/">Promact Infotech Pvt Ltd</a></p>
          
          <p class="email-footer">Thanks and Regards,<br>Promact Infotech Pvt Ltd</p>
        </div>
      </div>
    `;
      const emails: Email[] = [
        {
          subject: subject,
          body: body,
          recipients: [stakeholder.contact] 
        },
      ];
  
      this.emailService.sendEmails(emails).subscribe(
        () => {
          console.log(`Notification email sent successfully to ${stakeholderName}`);
        },
        (error) => {
          console.error(`Error sending notification email to ${stakeholderName}:`, error);
        }
      );
    });
  }
  
  
// download as pdf
downloadAsPdf() {
  this.approvedTeamService.getAllApprovedTeams().subscribe((data: any) => {
    this.approvedTeams = data.items.map((team: any) => ({
      projectId: team.projectId,
      phase: team.phase,
      numberOfResources: team.numberOfResources,
      role: team.role,
      availabilityPercentage: team.availabilityPercentage,
      duration: team.duration
    }));
    // Filter approved teams based on the project ID
    const filteredTeams = this.approvedTeams.filter(team => team.projectId === this.projectId);
    filteredTeams.sort((a, b) => a.phase - b.phase);
    const doc = new jsPDF();
    let yOffset = 10;
    let currentPage = 1;
    const maxPageHeight = doc.internal.pageSize.height - 20; 
    filteredTeams.forEach(team => {
      if (yOffset + 50 > maxPageHeight) {
        doc.addPage(); 
        yOffset = 10; // Reset yOffset for the new page
        currentPage++;
      }
      doc.text(`Phase ${team.phase}`, 10, yOffset);
      yOffset += 10;
      doc.text(`Number of Resources: ${team.numberOfResources}`, 20, yOffset);
      yOffset += 10;
      doc.text(`Role: ${team.role}`, 20, yOffset);
      yOffset += 10;
      doc.text(`Availability Percentage: ${team.availabilityPercentage}`, 20, yOffset);
      yOffset += 10;
      doc.text(`Duration: ${team.duration}`, 20, yOffset);
      yOffset += 10;
      yOffset += 10;
    });
    doc.save(`Latest_approved_teams_Data_of${currentPage}Pages.pdf`);
  }, error => {
    console.error('Error fetching approved teams:', error);
  });
  this.loadApprovedTeams();
}

getUniquePhases(): number[] {
  return [...new Set(this.approvedTeams.map(team => team.phase))];
}
}






























