import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewProjectComponent } from './MyComponent/new-project/new-project.component';
import { AuditorComponent } from './MyComponent/auditor/auditor.component';
import { DisplayProjectsComponent } from './MyComponent/display-projects/display-projects.component';
import { ProjectDetailsComponent } from './MyComponent/project-details/project-details.component';
import { LoginComponent } from './MyComponent/login/login.component';
const routes: Routes = [
  {path: '',component: LoginComponent},
  { path: 'new-project', component: NewProjectComponent }, 
  { path: 'all-projects', component:  LoginComponent },
  { path: 'project-details/:id', component: ProjectDetailsComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
