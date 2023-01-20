import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cs63Service } from 'src/app/service/cs63.service';
import Swal from 'sweetalert2';
import { DetailProduct } from '../../../../Models/DetailProduct'

@Component({
  selector: 'app-create-detailproduct',
  templateUrl: './create-detailproduct.component.html',
  styleUrls: ['./create-detailproduct.component.css']
})
export class CreateDetailproductComponent implements OnInit {
  midProduct: any
  public images: any = [];
  mDetailProduct: DetailProduct = {
    id: "",
    idProduct: "",
    image: "",
    weight: 0,
    dataMore: "",
    upfile: []
  }

  constructor(private location: Location, private cs63: Cs63Service, private router: Router) { }

  ngOnInit(): void {
    this.cs63.getProduct().subscribe(data => {
      this.midProduct = data
    })
  }

  onAddDetailProduct(value: any) {
    if (value.invalid) return;
    this.cs63.adddetailproduct(this.mDetailProduct).subscribe(
      (response) => {
        if (response.msg == this.cs63.OK) {
          Swal.fire({
            icon: 'success',
            title: 'สมัครสำเร็จ',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(["menuadmin/datadetailproduct"])

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
  onUploadImage(image: any) {
    
    this.images = []

    for (let file of image.target.files) {
      this.mDetailProduct.upfile.push(file)
    }
    
    //console.log(this.mDetail.upfile)

    //----- เป็นการนำรูปภาพมาใส่ในตัวแปร this.images โดยการ วนRoob 
    for (var i = 0; i < this.mDetailProduct.upfile.length; i++) {
      // new FileReader() คือ object เอาไว้จัดการไฟล์
      var reader = new FileReader();
      reader.onload = (e: any) => this.images.push(e.target.result);
      //reader.readAsDataURL(this.mDetailProduct.upfile[i]);
      reader.readAsDataURL(image.target.files[i]);
    }
    console.log(this.images)
  }

  onClickCancel() {
    this.location.back()
  }

}
