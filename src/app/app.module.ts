import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Home/home.component';
import { EmployeeModule } from './Employee/employee.module';
import { DepartmentModule } from './Department/department.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EmployeeModule,
    DepartmentModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,


  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [ HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
