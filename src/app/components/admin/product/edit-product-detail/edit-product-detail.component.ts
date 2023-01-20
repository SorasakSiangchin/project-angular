import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cs63Service } from 'src/app/service/cs63.service';
import { Location } from '@angular/common';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
//import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.prod';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-product-detail',
  templateUrl: './edit-product-detail.component.html',
  styleUrls: ['./edit-product-detail.component.css']
})
export class EditProductDetailComponent implements OnInit {
  ProductDetail:any
  public imageSrc: any = null;
  backendUrl = environment.backendUrl;
  constructor(private cs63: Cs63Service, private activatedRoute: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      let id = params.id
      // this.rest.getDetailProductX2Byid(id) ส่งidไป service
      this.ProductDetail = await this.cs63.getDetailProductX2Byid(id).toPromise();
    })
  }

  onEditDetailProduct(detailForm:any){
    if (detailForm.invalid) return

    // this.rest.updateProduct(this.mProduct) การส่งไปแก้ไข
    //subscribe ทำหน้าที่ติดตามผลลัพธ์ที่ส่งกลับมาเหมือน async/await
    this.cs63.updateDetailProduct(this.ProductDetail).subscribe(
      (response) => {
        if (response.msg == this.cs63.OK) {
          Swal.fire({
            icon: 'success',
            title: '<div class=armfont01>แก้ไขสำเร็จ</div>',
            showConfirmButton: false,
            timer: 1500
          })
          this.location.back()
        } else {
          Swal.fire({
            icon: 'error',
            title: 'ไม่พบสินค้า',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
          })
        }
      },
      (error) => {
        alert('Http Error')
      }
    )
  }

  onClickCancel(){
    this.location.back()
  }

  onUploadImage(event: any) {
    this.ProductDetail.upfile = event.target.files[0]; //upload to server

    // Show preview image
    if (this.ProductDetail.upfile) {
      const reader = new FileReader();
      reader.onload = e => (this.imageSrc = reader.result);
      reader.readAsDataURL(this.ProductDetail.upfile);
    }
  }
  
  public get timestamp(): string {
    return Date.now().toString()
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
}
