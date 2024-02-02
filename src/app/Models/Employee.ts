import { Department } from "./Department";

export class Employee{
  Id : number =0 ;
  Name !:string;
  Salary!:number;
  FkDepartmentId !: number;
  FkManagerId !: number;
  ManagerName !:string;
  ManagerOFManagerName!:string;
  DepartmentName !:string;
  MDepartmentName !:string;

  IsManager !:boolean ;
  // Employees !: Employee[] ;
  DepartmentObj!:Department;
  IsActive!: boolean;
}
