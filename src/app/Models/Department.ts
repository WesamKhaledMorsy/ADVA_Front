import { Employee } from "./Employee";

export class Department{
  Id !: number  ;
  Name !:string;
  ManagerId !: number;
  ManagerName !:string;
  Employees !: Employee[] ;
  IsActive!: boolean;
}
