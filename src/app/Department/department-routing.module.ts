import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentListComponent } from './department-list/department-list.component';

const routes: Routes = [
  {path : '', component : DepartmentListComponent},
  {path : 'department_list', component : DepartmentListComponent}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  providers:[RouterModule]
})
export class DepartmentRoutingModule { }
