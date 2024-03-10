import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuditorComponent } from './MyComponent/auditor/auditor.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './MyComponent/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidenavComponent } from './MyComponent/sidenav/sidenav.component';
import {FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NewProjectComponent } from './MyComponent/new-project/new-project.component';
import { HttpClientModule } from '@angular/common/http';
import { DisplayProjectsComponent } from './MyComponent/display-projects/display-projects.component';
import {MatTableModule} from '@angular/material/table';
import { ApprovedTeamComponent } from './MyComponent/approved-team/approved-team.component';
import { ClientFeedbackComponent } from './MyComponent/client-feedback/client-feedback.component';
import { ResourcesComponent } from './MyComponent/resources/resources.component';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [
    AppComponent,
    AuditorComponent,
    LoginComponent,
    SidenavComponent,
    NewProjectComponent,
    DisplayProjectsComponent,
    ApprovedTeamComponent,
    ClientFeedbackComponent,
    ResourcesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
   MatSidenavModule,
   MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatTableModule,
    MatSelectModule

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
