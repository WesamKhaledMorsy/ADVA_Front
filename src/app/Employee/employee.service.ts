import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Employee } from '../Models/Employee';
import { EmployeeApiUrls } from './Employee-api-urls';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  GlobalUrl:string = environment.API_URL;

  constructor(private http:HttpClient) { }
  //#region Employee
  public GetAllEmployee(){
    return this.http.get<Employee>(this.GlobalUrl+EmployeeApiUrls.Employee.UrlGetAllEmployeeList);
  }
  public GetAllEmployeeDataWithPaignation(pagesize:number,pagenumber:number,OrderBy:string,SortDir:string,Employee:Employee):any{
    return this.http.post<Employee>(this.GlobalUrl+EmployeeApiUrls.Employee.UrlGetAllEmployeeListWithPagination+`?PageSize=${pagesize}&PageNmuber=${pagenumber}&OrderBy=${OrderBy}&SortDir=${SortDir}`,Employee);
  }
  public GetEmployeeById(EmployeeId:number):any{
    return this.http.get(this.GlobalUrl+EmployeeApiUrls.Employee.UrlGetEmployeeById+`?id=${EmployeeId}`);
  }
  public GetAllActiveEmployee(){
    return this.http.get<Employee>(this.GlobalUrl+EmployeeApiUrls.Employee.UrlGetAllActiveEmployee);
  }
  public InsertEmployee(Employee:Employee):any{
    return this.http.post<Employee>(this.GlobalUrl+EmployeeApiUrls.Employee.UrlInsertEmployee,Employee);
  }
  public UpdateEmployee(Employee:Employee):any{
    return this.http.post<Employee>(this.GlobalUrl+EmployeeApiUrls.Employee.UrlUpdateEmployee,Employee);
  }
  public DeleteEmployee(EmployeeId:number):any{
    return this.http.delete(this.GlobalUrl+EmployeeApiUrls.Employee.UrlDeleteEmployee+`?id=${EmployeeId}`);
  }
//#endregion
}
