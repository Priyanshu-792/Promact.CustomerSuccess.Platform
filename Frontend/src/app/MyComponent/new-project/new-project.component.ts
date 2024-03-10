import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewProjectService } from '../../MyService/new-project.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrl: './new-project.component.css'
})
export class NewProjectComponent {
//  this is final code
//   // firstFormGroup = this._formBuilder.group({
//   //   firstCtrl: ['', Validators.required],
//   // });
  // secondFormGroup = this.formBuilder.group({
  //   secondCtrl: ['', Validators.required],
  // });
  // isLinear = false;

  // firstFormGroup!: FormGroup;

  // constructor(private formBuilder: FormBuilder, private newProjectService: NewProjectService) {}

  // ngOnInit() {
  //   this.firstFormGroup = this.formBuilder.group({
  //     Name: ['', Validators.required],
  //     Description: ['', Validators.required]
  //   });
  // }

  // submitForm() {
  //   if (this.firstFormGroup.valid) {
  //     this.newProjectService.createProject(this.firstFormGroup.value).subscribe(
  //       (response: any) => {
  //         // Handle response if needed
  //         console.log(response);
  //         // Optionally, navigate to a different route or perform other actions upon successful submission
  //         // Reset the form
  //         this.firstFormGroup.reset();
  //       },
  //       error => {
  //         // Handle error if needed
  //         console.error(error);
  //       }
  //     );
  //   } else {
  //     // Form is invalid, handle accordingly
  //   }
  // }










// this is code is for trying for universal service and it is successful can take as a final code
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

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
    this.newProjectService.createProject('project', this.firstFormGroup.value).subscribe(
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
