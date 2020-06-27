import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/shared/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  //list1 : any[];
  posts:any;
  constructor(private service: EmployeeService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id: null,
      employee_name: '',
      employee_salary: '',
      employee_age: ''
    }
  }

  onSubmit(form: NgForm) {
   if (form.value.id == null)
      this.insertRecord(form);
    else
    this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postEmployee(form.value).subscribe(res => {
      // this.service.list.push(form.value);
      //form['id']=res;
      console.log(res);
      console.log(this.service.list);

      //form.valid.id=res;
      //this.post=res;
      //console.log(this.service.formData);
      // this.service.list['id']=res;
      //let val={name:form.value};
      //this.service.list.slice(0,0,this.post);

    //this.posts=res;
    //console.log(this.posts);
    //this.service.list.push(this.posts);

      this.toastr.success('Inserted successfully', 'EMP. Register');
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  updateRecord(form: NgForm) {
    this.service.putEmployee(form.value).subscribe(res => {
      this.toastr.info('Updated successfully', 'EMP. Register');
      this.resetForm(form);
      this.service.refreshList();
    });

  }


}
