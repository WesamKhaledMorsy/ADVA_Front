import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from 'src/app/Models/Employee';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FocusForm } from 'src/app/validations/FocusForm';
import { GlobalFunctions } from 'src/app/Global/GlobalFunctions';
import Swal from 'sweetalert2';
import { DepartmentService } from 'src/app/Department/department.service';
import { Department } from 'src/app/Models/Department';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent{
  EmployeeList:Employee []=[];
  ManagersList:Employee[]=[];
  Departments:Department[]=[];
  EmployeeObj!:Employee;
  IsManagerUser :boolean =false;
  Search: any = {};

  EmployeeForm !: FormGroup;


   PageNumber: number = 1;
   totalPage: number = 0;
   TotalRows:number=0;
   PageSize:number=10;
   orderBy:string = 'Id';
   reverse:boolean=true;
   sortDir:string = 'desc';
   SortClass:string='ft-arrow-down'

   submitted = false;
   IsUpdate = false;
   @ViewChild('closeModal') closeModal: any;
   @ViewChild('openModal') openModal: any;
  constructor(private employeeService:EmployeeService,
              private FocusForm:FocusForm,
              private formBuilder:FormBuilder,
              private departmentService:DepartmentService){}

  ngOnInit(): void {
    this.EmployeeForm = this.formBuilder.group({
      Name: new FormControl('',[Validators.required]),
      Salary: new FormControl('',[Validators.required]),
      IsActive: new FormControl(''),
      Id:new FormControl(0),
      FkManagerId:new FormControl(null),
      FkDepartmentId:new FormControl(null),
      IsManager:new FormControl('')
    })
    this.GetAllAndsearchEmployeeList();
    //this.getAllEmployees();
    this.fillDepartmentList();
  }

  getAllEmployees(){
    this.employeeService.GetAllEmployee().subscribe((res:any)=>{
      if ((res.items) && res.items.length > 0) {
        this.ManagersList=res.items;
        this.ManagersList = this.ManagersList.filter(mang =>mang.IsManager == true)
      }else{
        this.ManagersList=[];
      }
    })
  }

  GetAllAndsearchEmployeeList() {
    this.employeeService.GetAllEmployeeDataWithPaignation(this.PageSize, this.PageNumber, this.orderBy, this.sortDir, this.Search)
      .subscribe((res: any) => {
        if ((res.items) && res.items.Item1.length > 0) {
          this.EmployeeList = res.items.Item1;
          let PagingInfo = res.items.Item2[0];
          this.totalPage = PagingInfo.TotalPages;
          this.TotalRows = PagingInfo.TotalRows;
          this.ManagersList =res.items.Item3;
        }
        else{
          this.EmployeeList=[];
        }
      })
    }


submitForm() {

  this.submitted = true;

  if (this.EmployeeForm.valid) {
    let EmployeeObj = { ...this.EmployeeForm.value };
    if (!EmployeeObj.Id) {
      this.InsertEmployee(EmployeeObj);
    }
    else{
      this.UpdateEmployee(EmployeeObj);
    }
  }else{
    this.submitted = true;
    this.FocusForm.focusInvalidForm(this.EmployeeForm);
  }
}

resetForm(){
  this.EmployeeForm.reset();
  this.submitted = false;
  this.IsUpdate = false;
}
bindEmployee(item:Employee){
  this.EmployeeObj = item;
  this.IsUpdate=true;
  this.fillDepartmentList();
  if(item.IsManager){
    //this.Departments =[];
    this.EmployeeForm.controls['FkDepartmentId'].setValue(item.FkDepartmentId) ;
    this.IsManagerUser= true;
  }else{
    this.IsManagerUser=false;
  }
  this.EmployeeForm.controls['FkDepartmentId'].setValue(item.FkDepartmentId) ;
  this.EmployeeForm.patchValue(item);
}
InsertEmployee(EmployeeObj:Employee){
  this.employeeService.InsertEmployee(EmployeeObj).subscribe({
    next: (res:any) => {
      if (res.items) {
        this.EmployeeList.unshift(res.items);
        this.resetForm();
        this.closeModal.nativeElement.click();
        Swal.fire({
          text:'Saved Successfully',
          icon: "success"
        });
        this.GetAllAndsearchEmployeeList();
      }
    },
    error: (res:any) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: 'Some thing went wrong'
      })
    }
  });
}
UpdateEmployee(EmployeeObj:Employee){
  this.employeeService.UpdateEmployee(EmployeeObj).subscribe({
    next: (res:any) => {
      if (res.items) {
        let index = this.EmployeeList.findIndex(c=>c.Id==res.items.Id);
        this.EmployeeList[index]=res.items;
        this.resetForm();
        this.closeModal.nativeElement.click();
        Swal.fire({
          text: 'Updated Successfully',
          icon: "success"
        });
        this.GetAllAndsearchEmployeeList();
      }
    },
    error: (res:any) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: 'Some thing went wrong'
      })
    }
  });
}

SearchEmployee(){
  this.GetAllAndsearchEmployeeList();
}

ResetEmployeeSearch(){
  this.Search={};
  this.GetAllAndsearchEmployeeList();
}

pageChangeEvent(event: number){
  this.PageNumber = event;
 this.GetAllAndsearchEmployeeList();
}

fillDepartmentList() {
  let _ManagerId=this.EmployeeForm.controls['FkManagerId'].value;

  this.departmentService.GetAllDepartment().subscribe((res: any) => {
    if ((res.items) && res.items.length > 0) {
      this.Departments = res.items;
      if(this.EmployeeObj != null && this.EmployeeObj != undefined){
        if(this.EmployeeObj.IsManager){
          this.IsManagerUser= true;
        }else{
          this.Departments = this.Departments.filter(depart => depart.ManagerId == _ManagerId);
        }
      }else{
        this.Departments=[];
        this.resetForm()
      }
    } else {
      this.Departments = [];
      this.EmployeeForm.controls['FkManagerId'].setValue(null);
    }
  })
}
    sortColumn(colName: string) {
      this.orderBy = colName;
      let returnobj:any = GlobalFunctions.sortColumn(colName,this.orderBy);
      this.sortDir = returnobj.sortDir
      this.reverse = returnobj.reverse
      this.SortClass = GlobalFunctions.sortClass(colName,this.reverse)
      this.GetAllAndsearchEmployeeList();
    }
}
