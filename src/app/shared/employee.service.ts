import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  formData  : Employee;
  list : any[];
  readonly rootURL ="http://dummy.restapiexample.com/api/v1"
  httpClient: any;
  url: string;

  constructor(private http : HttpClient) {}

  postEmployee(formData : Employee){
   return this.http.post(this.rootURL+'/create',formData); 
  }

  refreshList(){
    this.http.get(this.rootURL+'/employees')
    .toPromise().then(res => this.list = res as Employee[]);
    console.log("List API called");
  }

  putEmployee(formData: Employee){
    console.log("Update API called");
    return this.http.put(this.rootURL+'/update/'+formData.id,formData); 
   }

   deleteEmployee(id : number){
    console.log(" Delete API called");
    return this.http.delete(this.rootURL+'/delete/'+id);
   }
  }

