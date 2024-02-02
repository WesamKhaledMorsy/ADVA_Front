import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  {path : '', component : EmployeeListComponent},
  {path : 'employee_list', component : EmployeeListComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  providers:[RouterModule]
})
export class EmployeeRoutingModule { }
