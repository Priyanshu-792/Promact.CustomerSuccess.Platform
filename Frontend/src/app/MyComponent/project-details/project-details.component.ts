import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent implements OnInit {
  projectId!: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  
  isLinear = false;

  ngOnInit(): void {
    // Retrieve projectId from route parameters
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
    });
  }
}
