import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewProjectService } from '../../MyService/new-project.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrl: './new-project.component.css'
})
export class NewProjectComponent {



  // firstFormGroup!: FormGroup;

  // constructor(private _formBuilder: FormBuilder, private NewProjectService:NewProjectService ) {}

  // ngOnInit() {
  //   this.firstFormGroup = this._formBuilder.group({
  //     projectName: ['', Validators.required],
  //     description: ['', Validators.required]
  //   });
  // }

  // submitForm() {
  //   if (this.firstFormGroup.valid) {
  //     this.NewProjectService.createProject(this.firstFormGroup.value).subscribe(
  //       (        response: any) => {
  //         // Handle response if needed
  //         console.log(response);
  //         // Optionally, navigate to a different route or perform other actions upon successful submission
  //       },
  //       error => {
  //         // Handle error if needed
  //         console.error(error);
  //       }
  //     );
  //   } else {
    
  //   }
  // }




  // firstFormGroup = this._formBuilder.group({
  //   firstCtrl: ['', Validators.required],
  // });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  // constructor(private _formBuilder: FormBuilder) {}



  firstFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private newProjectService: NewProjectService) {}

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      Name: ['', Validators.required],
      Description: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.firstFormGroup.valid) {
      this.newProjectService.createProject(this.firstFormGroup.value).subscribe(
        (response: any) => {
          // Handle response if needed
          console.log(response);
          // Optionally, navigate to a different route or perform other actions upon successful submission
          // Reset the form
          this.firstFormGroup.reset();
        },
        error => {
          // Handle error if needed
          console.error(error);
        }
      );
    } else {
      // Form is invalid, handle accordingly
    }
  }
}
