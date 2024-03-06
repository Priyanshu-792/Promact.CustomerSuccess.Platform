import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewProjectComponent } from './MyComponent/new-project/new-project.component';
import { AuditorComponent } from './MyComponent/auditor/auditor.component';

const routes: Routes = [
  {path: '',component: AuditorComponent},
  { path: 'new-project', component: NewProjectComponent }, // Define route for NewProjectComponent
  // Other routes can be defined here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
