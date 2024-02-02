import { HomeComponent } from './Home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'home',component:HomeComponent},
  {
    path: 'department',
    loadChildren: () => import('../app/Department/department-routing.module').then(m => m.DepartmentRoutingModule),
  },
  {
    path: 'employee',
    loadChildren: () => import('../app/Employee/employee-routing.module').then(m => m.EmployeeRoutingModule),
  },
 {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true,
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
  })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
