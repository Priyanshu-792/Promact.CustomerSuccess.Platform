import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewProjectService } from '../../MyService/new-project.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrl: './new-project.component.css'
})
export class NewProjectComponent {
  // firstFormGroup = this._formBuilder.group({
  //   firstCtrl: ['', Validators.required],
  // });
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
      this.newProjectService.createProject(this.firstFormGroup.value).subscribe(
        (response: any) => {
          // Handle response if needed
          console.log(response);
  
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
