import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TypeProduct } from 'src/app/Models/TypeProducts';
import { Cs63Service } from 'src/app/service/cs63.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment.prod';
//import { environment } from 'src/environments/environment';
import { Product01 } from 'src/app/Models/Products';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  mTypeProduct!: TypeProduct[]
  mProduct!: Product01
  public imageSrc: any = null;

  backendUrl = environment.backendUrl;
  constructor(private cs63: Cs63Service, private activatedRoute: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.feedData()
    this.activatedRoute.params.subscribe(async params => {
      let id = params.id
      // this.rest.getProductById(id) ส่งidไป service
      this.mProduct = await this.cs63.getProductById(id).toPromise();
    })
  }

  onEditProduct(userForm: any) {

    if (userForm.invalid) return

    // this.rest.updateProduct(this.mProduct) การส่งไปแก้ไข
    //subscribe ทำหน้าที่ติดตามผลลัพธ์ที่ส่งกลับมาเหมือน async/await
    this.cs63.updateProduct(this.mProduct).subscribe(
      (response) => {
        if (response.msg == this.cs63.OK) {
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
  onUploadImage(event: any) {
    this.mProduct.upfile = event.target.files[0]; //upload to server
    // Show preview image
    if (this.mProduct.upfile) {
      const reader = new FileReader();
      reader.onload = e => (this.imageSrc = reader.result);
      reader.readAsDataURL(this.mProduct.upfile);
    }
  }

  onClickCancel() {
    this.location.back()
  }

  public get timestamp(): string {
    return Date.now().toString()
  }

  feedData() {
    //subscribe ทำหน้าที่ติดตามผลลัพธ์ที่ส่งกลับมาเหมือน async/await
    this.cs63.getTypeProduct()
      // ถ้าสำเร็จจะกับมา data
      // data.map 
      // item.image ส่งชื่อรูปภาพ
      .subscribe(data => {
        this.mTypeProduct = data
      },
        error => {
          alert(JSON.stringify(error.error.message))
        },
        () => {
          console.log('complete')
        })
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new ErrorStateMatcher();
}
