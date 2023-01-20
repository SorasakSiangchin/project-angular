import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Location } from '@angular/common';
import { TypeProduct01 } from 'src/app/Models/TypeProducts';
import { Cs63Service } from 'src/app/service/cs63.service';
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-typeproduct',
  templateUrl: './create-typeproduct.component.html',
  styleUrls: ['./create-typeproduct.component.css']
})
export class CreateTypeproductComponent implements OnInit {
  mTypeProduct:TypeProduct01={
    name:""
  }
  constructor(private location: Location,private cs63:Cs63Service) { }

  ngOnInit(): void {
  }
  onClickCancel() {
    this.location.back()
  }
  
  AddTypeProduct(productForm: any){
    if (productForm.invalid) return;
    this.cs63.addtypeproduct(this.mTypeProduct).subscribe(
      response =>{ 
          if (response.msg == this.cs63.OK) {
            Swal.fire({
              icon: 'success',
              title: 'เพิ่มข้อมูลเรียบร้อย',
              showConfirmButton: false,
              timer: 1500
            })
            this.location.back()
          }  else{
            Swal.fire({
              icon: 'error',
              title: 'ไม่สามารถเพิ่มข้อมูล',
              text: response.msg,
              footer: '<a href>Why do I have this issue?</a>'
            })
          }
      },
      (error) => {
        alert('Http error')
      }
    )
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
}
