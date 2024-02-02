import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { DepartmentApiUrls } from './Deparment-api-urls';
import { Department } from '../Models/Department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  GlobalUrl:string = environment.API_URL;
  constructor(private http:HttpClient) { }
   //#region Department
   public GetAllDepartment(){
    return this.http.get<Department>(this.GlobalUrl+DepartmentApiUrls.Department.UrlGetAllDepartmentList);
  }
  public GetAllDepartmentDataWithPaignation(pagesize:number,pagenumber:number,OrderBy:string,SortDir:string,Department:Department):any{
    return this.http.post<Department>(this.GlobalUrl+DepartmentApiUrls.Department.UrlGetAllDepartmentListWithPagination+`?PageSize=${pagesize}&PageNmuber=${pagenumber}&OrderBy=${OrderBy}&SortDir=${SortDir}`,Department);
  }
  public GetDepartmentById(DepartmentId:number):any{
    return this.http.delete(this.GlobalUrl+DepartmentApiUrls.Department.UrlGetDepartmentById+`?id=${DepartmentId}`);
  }
  public GetAllActiveDepartment(){
    return this.http.get<Department>(this.GlobalUrl+DepartmentApiUrls.Department.UrlGetAllActiveDepartment);
  }
  public InsertDepartment(Department:Department):any{
    return this.http.post<Department>(this.GlobalUrl+DepartmentApiUrls.Department.UrlInsertDepartment,Department);
  }
  public UpdateDepartment(Department:Department):any{
    return this.http.post<Department>(this.GlobalUrl+DepartmentApiUrls.Department.UrlUpdateDepartment,Department);
  }
  public DeleteDepartment(DepartmentId:number):any{
    return this.http.delete(this.GlobalUrl+DepartmentApiUrls.Department.UrlDeleteDepartment+`?id=${DepartmentId}`);
  }
//#endregion
}
