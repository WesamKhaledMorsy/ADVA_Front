import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FocusForm } from 'src/app/validations/FocusForm';
import { GlobalFunctions } from 'src/app/Global/GlobalFunctions';
import { Department } from 'src/app/Models/Department';
import { EmployeeService } from 'src/app/Employee/employee.service';
import { DepartmentService } from '../department.service';
import Swal from 'sweetalert2';
import { Employee } from 'src/app/Models/Employee';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent {
  DepartmentList:Department []=[];
  ManagersList:Employee[]=[];
  Departments:Department[]=[];
  managerObj= new Employee();
  Search: any = {};

  DepartmentForm !: FormGroup;


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
  constructor(private departmentService:DepartmentService,
              private FocusForm:FocusForm,
              private formBuilder:FormBuilder,
              private employeeService:EmployeeService){}

  ngOnInit(): void {
    this.DepartmentForm = this.formBuilder.group({
      Name: new FormControl('',[Validators.required]),
      ManagerId:new FormControl(null),
      Id:new FormControl(0),
      IsActive: new FormControl('')
    })
    this.GetAllAndsearchDepartmentList();
    this.getAllEmployees();
  }

  getAllEmployees(){
    this.employeeService.GetAllEmployee().subscribe((res:any)=>{
      console.log(res);
      if ((res.items) && res.items.length > 0) {
        this.ManagersList=res.items;
        this.ManagersList = this.ManagersList.filter(mang =>mang.IsManager == true && mang.FkDepartmentId == null)
      }else{
        this.ManagersList=[];
      }
    })
  }

  GetAllAndsearchDepartmentList() {
    this.departmentService.GetAllDepartmentDataWithPaignation(this.PageSize, this.PageNumber, this.orderBy, this.sortDir, this.Search)
      .subscribe((res: any) => {
        if ((res.items) && res.items.Item1.length > 0) {
          this.DepartmentList = res.items.Item1;
          console.log(this.DepartmentList);
          let PagingInfo = res.items.Item2[0];
          this.totalPage = PagingInfo.TotalPages;
          this.TotalRows = PagingInfo.TotalRows;
        }
        else{
          this.DepartmentList=[];
        }
      })
    }


submitForm() {

  this.submitted = true;

  if (this.DepartmentForm.valid) {
    let DepartmentObj = { ...this.DepartmentForm.value };
    if (!DepartmentObj.Id) {
      this.InsertDepartment(DepartmentObj);
    }
    else{
      this.UpdateDepartment(DepartmentObj);
    }
  }else{
    this.submitted = true;
    this.FocusForm.focusInvalidForm(this.DepartmentForm);
  }
}

resetForm(){
  this.DepartmentForm.reset();
  this.submitted = false;
  this.IsUpdate = false;
}
bindDepartment(item:Department){
  this.IsUpdate=true;
  //this.DepartmentForm.controls['FkDepartmentId'].setValue(item.FkDepartmentId);
  this.DepartmentForm.patchValue(item);
}
InsertDepartment(DepartmentObj:Department){
  // console.log(DepartmentObj.DepartmentObj);
  this.departmentService.InsertDepartment(DepartmentObj).subscribe({
    next: (res:any) => {
      if (res.items) {
        this.DepartmentList.unshift(res.items);
        // this.managerObj.FkDepartmentId = DepartmentObj.Id;
        // this.UpdateEmployee(this.managerObj);
        this.resetForm();
        this.closeModal.nativeElement.click();
        Swal.fire({
          text:'Saved Successfully',
          icon: "success"
        });

        this.GetAllAndsearchDepartmentList();
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
UpdateDepartment(DepartmentObj:Department){
  let departID= DepartmentObj.Id;
  this.departmentService.UpdateDepartment(DepartmentObj).subscribe({
    next: (res:any) => {
      if (res.items) {
        let index = this.DepartmentList.findIndex(c=>c.Id==res.items.Id);
        this.DepartmentList[index]=res.items;
        console.log( this.DepartmentList[index]);
        this.resetForm();
        this.closeModal.nativeElement.click();
        Swal.fire({
          text: 'Updated Successfully',
          icon: "success"
        });

        this.GetAllAndsearchDepartmentList();
      }
    },
    error: (res:any) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: 'Some thing went wrong'
      })
    }
  }).then(
    this.managerObj.FkDepartmentId =Number(departID),
    this.UpdateEmployee(this.managerObj)
  );
}

updateManager(event: any){
  let managerID =Number(event.value.slice(3)) ;
  console.log(event.value.slice(3));
  this.employeeService.GetEmployeeById(managerID)
    .subscribe((res:any)=>{
      if(res){
        this.managerObj = res;
        console.log(this.managerObj);
      }else{
        this.managerObj =new Employee();
      }
    });

}
UpdateEmployee(EmployeeObj:Employee){
  EmployeeObj = this.managerObj;
  this.employeeService.UpdateEmployee(EmployeeObj).subscribe({
    next: (res:any) => {
      if (res.items) {
        this.resetForm();
        this.closeModal.nativeElement.click();
        Swal.fire({
          text: 'Updated Successfully',
          icon: "success"
        });

        this.GetAllAndsearchDepartmentList();
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
SearchDepartment(){
  this.GetAllAndsearchDepartmentList();
}

ResetDepartmentSearch(){
  this.Search={};
  this.GetAllAndsearchDepartmentList();
}

pageChangeEvent(event: number){
  this.PageNumber = event;
 this.GetAllAndsearchDepartmentList();
}

// fillDepartmentList() {
//   let _ManagerId=this.DepartmentForm.controls['ManagerId'].value;
//     console.log(_ManagerId);
//   this.departmentService.GetAllDepartment().subscribe((res: any) => {
//     if ((res.items) && res.items.length > 0) {
//       this.Departments = res.items;
//       this.Departments = this.Departments.filter(depart => depart.ManagerId == _ManagerId);
//       console.log(this.Departments);
//     } else {
//       this.Departments = [];
//       this.DepartmentForm.controls['ManagerId'].setValue(null);
//     }
//   })
// }
    sortColumn(colName: string) {
      this.orderBy = colName;
      let returnobj:any = GlobalFunctions.sortColumn(colName,this.orderBy);
      this.sortDir = returnobj.sortDir
      this.reverse = returnobj.reverse
      this.SortClass = GlobalFunctions.sortClass(colName,this.reverse)
      this.GetAllAndsearchDepartmentList();
    }
}

