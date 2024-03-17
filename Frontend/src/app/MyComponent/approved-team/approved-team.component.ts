// import { Component, Input, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ApprovedTeamService } from '../../MyService/approved-team.service';
// import { NewProjectService } from '../../MyService/new-project.service';
// import jsPDF from 'jspdf';
// import { ApprovedTeam } from '../../models/approved-team';
// import { EmailService } from '../../MyService/email.service';
// import { StakeHoldersService } from '../../MyService/stake-holders.service';
// import { Stakeholder } from '../../models/stake-holders';
// import { Email } from '../../models/email';

// @Component({
//   selector: 'app-approved-team',
//   templateUrl: './approved-team.component.html',
//   styleUrl: './approved-team.component.css'
// })
// export class ApprovedTeamComponent implements OnInit{
// @Input() projectId!: string; // Define projectId property
// approvedTeams: ApprovedTeam[] = [];
// stakeholders: Stakeholder[]=[];
//   resourceForm!: FormGroup;
//   projectPlaceholder!: string;
//   projects: any[] = [];

//   constructor(
//     private formBuilder: FormBuilder,
//     private approvedTeamService: ApprovedTeamService,
//     private projectService: NewProjectService,
//     private emailService: EmailService,
//     private stakeholderService: StakeHoldersService
//   ) { }

//   ngOnInit(): void {
//     this.resourceForm = this.formBuilder.group({
//       projectId: [this.projectId, Validators.required], // Use projectId in the value
//       phase: ['', Validators.required],
//       numberOfResources: [0, Validators.required],
//       role: ['', Validators.required],
//       availabilityPercentage: [0, Validators.required],
//       duration: [0, Validators.required]
//     });
    
//     this.loadProjects();
//     this.loadApprovedTeams();
//     this.loadStakeholders();
    
    
//   }
// pName!:string;
//   loadProjects(): void {
//     this.projectService.getAllProjects('project').subscribe(
//       (data: any) => {
//         this.projects = data.items.map((project: any) => ({
//           id: project.id,
//           projectName: project.name
//         }));

//         this.projects.forEach((project: any) => {
//           if (project.id === this.projectId) {
//             this.pName = project.projectName;
//           }
//         });

//       },
//       error => {
//         console.error('Error loading projects:', error);
//       }
//     );
//   }
//   onSubmit(): void {
//     if (this.resourceForm.valid) {
//       const formData = this.resourceForm.value;
//       this.approvedTeamService.createApprovedTeam(formData).subscribe(
//         (response: any) => {
//           console.log('Approved team created successfully:', response);
//           this.resourceForm.reset({ projectId: this.projectId });
//           this.loadApprovedTeams();
          
//           // Send notification email to stakeholders
//           this.sendNotification(formData);
//         },
//         (error: any) => {
//           console.error('Error creating approved team:', error);
//         }
//       );
//     } else {
//       console.error('Form is invalid.');
//     }
//   }

// //displaying approved team table here
// loadApprovedTeams(): void {
//   this.approvedTeamService.getAllApprovedTeams().subscribe(
//     (data: any) => {
//       this.approvedTeams = data.items.filter((team: ApprovedTeam) => team.projectId === this.projectId);
//       this.approvedTeams.sort((a, b) => a.phase - b.phase);
//     },
//     error => {
//       console.error('Error loading approved teams:', error);
//     }
//   );
// }

//   loadStakeholders(): void {
//     this.stakeholderService.getAllStakeholders().subscribe(
//       (data: any) => {
//         // Filter stakeholders based on the project ID
//         this.stakeholders = data.items.filter((stakeholder: Stakeholder) => stakeholder.projectId === this.projectId);
//         console.log('Stakeholders:', this.stakeholders);

//         // Extract contacts from stakeholders
//         const contacts: string[] = this.extractContactsFromStakeholders(this.stakeholders);
//         console.log('Contacts:', contacts);
//       },
//       (error) => {
//         console.error('Error loading stakeholders:', error);
//       }
//     );
//   }

//   extractContactsFromStakeholders(stakeholders: Stakeholder[]): string[] {
//     const contacts: string[] = [];

//     stakeholders.forEach((stakeholder: Stakeholder) => {
//       // Split contacts by semicolon and add to contacts array
//       const stakeholderContacts: string[] = stakeholder.contact.split(',');
//       stakeholderContacts.forEach((contact: string) => {
//         contacts.push(contact.trim());
//       });
//     });

//     return contacts;
//   }


//   sendNotification(formData: any): void {
//     const subject = 'Approved team is updated';
  
//     // Construct the email body with proper words format
//     const body = `
//   Hello Stakeholder,<br>
  
//   Please note that the approved team has been updated. Here is the summary:<br>
  
//   Project ID: ${formData.projectId}<br>
//   Phase: ${formData.phase}<br>
//   Number of Resources: ${formData.numberOfResources}<br>
//   Role: ${formData.role}<br>
//   Availability Percentage: ${formData.availabilityPercentage}%<br>
//   Duration: ${formData.duration} days<br>
  
//   Thanks and Regards,<br>
//   Promact Infotech Pvt Ltd
//   `;
  
//     // Extract stakeholders' email addresses from stakeholders
//     const stakeholdersEmails: string[] = this.extractContactsFromStakeholders(this.stakeholders);
  
//     const emails: Email[] = [
//       {
//         subject: subject,
//         body: body,
//         recipients: stakeholdersEmails
//       },
//     ];
  
//     this.emailService.sendEmails(emails).subscribe(
//       () => {
//         console.log('Notification email sent successfully');
//       },
//       (error) => {
//         console.error('Error sending notification email:', error);
//       }
//     );
//   }
  


// // trying to implement download as pdf
// downloadAsPdf() {
//   this.approvedTeamService.getAllApprovedTeams().subscribe((data: any) => {
//     this.approvedTeams = data.items.map((team: any) => ({
//       projectId: team.projectId,
//       phase: team.phase,
//       numberOfResources: team.numberOfResources,
//       role: team.role,
//       availabilityPercentage: team.availabilityPercentage,
//       duration: team.duration
//     }));
//     // Filter approved teams based on the project ID
//     const filteredTeams = this.approvedTeams.filter(team => team.projectId === this.projectId);
//     // Sort teams by phase number in ascending order
//     filteredTeams.sort((a, b) => a.phase - b.phase);
//     const doc = new jsPDF();
//     let yOffset = 10;
//     let currentPage = 1;
//     const maxPageHeight = doc.internal.pageSize.height - 20; // Maximum height of each page
//     filteredTeams.forEach(team => {
//       // Check if adding the current team would exceed the page height
//       if (yOffset + 50 > maxPageHeight) {
//         doc.addPage(); // Add a new page
//         yOffset = 10; // Reset yOffset for the new page
//         currentPage++;
//       }
//       // Add phase number as heading
//       doc.text(`Phase ${team.phase}`, 10, yOffset);
//       yOffset += 10;
//       // Add other data fields below phase heading
//       doc.text(`Number of Resources: ${team.numberOfResources}`, 20, yOffset);
//       yOffset += 10;
//       doc.text(`Role: ${team.role}`, 20, yOffset);
//       yOffset += 10;
//       doc.text(`Availability Percentage: ${team.availabilityPercentage}`, 20, yOffset);
//       yOffset += 10;
//       doc.text(`Duration: ${team.duration}`, 20, yOffset);
//       yOffset += 10;
//       // Add spacing between phases
//       yOffset += 10;
//     });
//     // Save the PDF with appropriate file name
//     doc.save(`Latest_approved_teams_Data_of${currentPage}Pages.pdf`);
//   }, error => {
//     console.error('Error fetching approved teams:', error);
//   });
//   this.loadApprovedTeams();
// }

// getUniquePhases(): number[] {
//   return [...new Set(this.approvedTeams.map(team => team.phase))];
// }
// }































































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
  
          // Call sendNotification with formData
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
        // Filter stakeholders based on the project ID
        this.stakeholders = data.items.filter((stakeholder: Stakeholder) => stakeholder.projectId === this.projectId);
  
        console.log('Stakeholders:', this.stakeholders);
      },
      (error) => {
        console.error('Error loading stakeholders:', error);
      }
    );
  }
  

  sendNotification(formData: any): void {
    const subject = 'Approved team is updated';
  
    // Iterate over each stakeholder and send individual notifications
    this.stakeholders.forEach((stakeholder: Stakeholder) => {
      const stakeholderName = stakeholder.name;
      const body = `
  Hello ${stakeholderName},<br>

  Please note that the approved team has been updated. Here is the summary:<br>

  Project Name: ${this.pName}<br>
  Phase: ${formData.phase}<br>
  Number of Resources: ${formData.numberOfResources}<br>
  Role: ${formData.role}<br>
  Availability Percentage: ${formData.availabilityPercentage}%<br>
  Duration: ${formData.duration} months<br>
  
  For more details, visit our official website: <a href="https://promactinfo.com/">Promact Infotech Pvt Ltd</a><br>
  Thanks and Regards,<br>
  Promact Infotech Pvt Ltd
`;

  
      const emails: Email[] = [
        {
          subject: subject,
          body: body,
          recipients: [stakeholder.contact] // Assuming email is the property containing the stakeholder's email
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
    // Sort teams by phase number in ascending order
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
      // Add phase number as heading
      doc.text(`Phase ${team.phase}`, 10, yOffset);
      yOffset += 10;
      // Add other data fields below phase heading
      doc.text(`Number of Resources: ${team.numberOfResources}`, 20, yOffset);
      yOffset += 10;
      doc.text(`Role: ${team.role}`, 20, yOffset);
      yOffset += 10;
      doc.text(`Availability Percentage: ${team.availabilityPercentage}`, 20, yOffset);
      yOffset += 10;
      doc.text(`Duration: ${team.duration}`, 20, yOffset);
      yOffset += 10;
      // Add spacing between phases
      yOffset += 10;
    });
    // Save the PDF with appropriate file name
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






























