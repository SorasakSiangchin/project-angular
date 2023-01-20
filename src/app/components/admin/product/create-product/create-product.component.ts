import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/Models/Products';
import { TypeProduct } from 'src/app/Models/TypeProducts';
import { Cs63Service } from 'src/app/service/cs63.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  mProduct: Product = {
    id: "",
    idTypeProduct: "",
    name: "",
    price: "",
    image: "",
    stock: "",
    color: "",
    shape: "",
    // upfile ส่งให้ server
    upfile: null
  }
  typeproduct!:TypeProduct[]
  public imageSrc: any = null;
  isError: any
  constructor(private cs63: Cs63Service, private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.feedTypeProduct()
  }

  //------------------
  onAddProduct(productForm: any) {
    if (productForm.invalid) return;
    this.cs63.addproduct(this.mProduct).subscribe(
      (response) => {
        if (response.msg == this.cs63.OK) {
          Swal.fire({
            icon: 'success',
            title: 'สมัครสำเร็จ',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(["menuadmin/dataproduct"])

        } else {
          Swal.fire({
            icon: 'error',
            title: 'ไม่สามารถสมัครได้',
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
  //------------------

  //----------------------------------------------------
  onUploadImage(event: any) {
    // event.target.files[0]; เอาแค่รูปเดียว ถ้าเอาหลายรูปให้เอา event มาวนรูว
    this.mProduct.upfile = event.target.files[0]; //upload to server
    // Show preview image หรือ เอารูปมาแสดง
    if (this.mProduct.upfile) {
      // FileReader แปลว่าโปรแกรมอ่านไฟล์
      const reader = new FileReader();
      // result แปลว่า ผลลัพธ์
      reader.onload = e => (this.imageSrc = reader.result);
      // อ่านค่า
      reader.readAsDataURL(this.mProduct.upfile);
    }
  }
  //----------------------------------------------------
  onClickCancel() {
    this.location.back()
  }
  
  feedTypeProduct() {
    //subscribe ทำหน้าที่ติดตามผลลัพธ์ที่ส่งกลับมาเหมือน async/await
    this.cs63.getTypeProduct()
      // ถ้าสำเร็จจะกับมา data
      // data.map 
      // item.image ส่งชื่อรูปภาพ
      .subscribe(data => {
        this.typeproduct = data
      },
        error => {
          alert(JSON.stringify(error.error.message))
        },
        () => {
          console.log('complete')
        })
  }
  
}
