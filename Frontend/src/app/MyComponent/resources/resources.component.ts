import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from '../../MyService/resources.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css'
})
export class ResourcesComponent {

  resourceForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private resourceService: ResourcesService) { }

  ngOnInit(): void {
    this.resourceForm = this.formBuilder.group({
      projectId: ['', Validators.required],
      resourceName: ['', Validators.required],
      allocationPercentage: [0, Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      role: ['', Validators.required],
      comment: ['']
    });
  }

  onSubmit(): void {
    if (this.resourceForm.valid) {
      this.resourceService.createResource(this.resourceForm.value).subscribe(
        (response: any) => {
          console.log('Resource created successfully:', response);
          // Optionally, perform any additional actions upon successful creation
          this.resourceForm.reset();
        },
        error => {
          console.error('Error creating resource:', error);
          // Optionally, handle error if needed
        }
      );
    } else {
      // Form is invalid, handle accordingly
    }
  }
}
