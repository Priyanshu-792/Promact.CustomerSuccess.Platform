import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewProjectComponent } from './MyComponent/new-project/new-project.component';
import { AuditorComponent } from './MyComponent/auditor/auditor.component';
import { DisplayProjectsComponent } from './MyComponent/display-projects/display-projects.component';

const routes: Routes = [
  {path: '',component: AuditorComponent},
  { path: 'new-project', component: NewProjectComponent }, // Define route for NewProjectComponent
  { path: 'all-projects', component: DisplayProjectsComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
