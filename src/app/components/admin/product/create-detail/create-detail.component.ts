import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cs63Service } from 'src/app/service/cs63.service';
import { DetailProductUpFileImages } from 'src/app/Models/DetailProduct';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-detail',
  templateUrl: './create-detail.component.html',
  styleUrls: ['./create-detail.component.css']
})
export class CreateDetailComponent implements OnInit {
  dataimg: any
  public images: any = [];
  //-------เป็นการสร้าง array อีก 1 รูปแบบ---------
  // public images: any=[];



  // public imageSrc!: any[];
  // public imageSrc01: any = null;
  public mDetail: DetailProductUpFileImages = {
    idProduct:0,
    image: "",
    upfile: [],
  }
  IdProduct:any;
  constructor(private cs63: Cs63Service, private activatedRoute: ActivatedRoute,
    private location: Location) {
  }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      let id = params.id
      this.GetId(id)
    })
  }
  
GetId(id:number){
  this.IdProduct = id
  this.mDetail.idProduct = this.IdProduct
}

  onAddDetailProduct(value: any) {
    if (value.invalid) return;
    this.cs63.adddetailproduct(this.mDetail).subscribe(
      (response) => {
        if (response.msg == this.cs63.OK) {
          Swal.fire({
            icon: 'success',
            title: 'เพิ่มข้อมูลสำเร็จ',
            showConfirmButton: false,
            timer: 1500
          })
          this.location.back()
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

  onClickCancel() {
    this.location.back()
  }

  onUploadImage(event: any) {
    // เอาไว้รีเฟรสข้อมูล และ เอาไว้เก็บข้อมูล
    //this.images = []
    // event.target.files[0]; เอาแค่รูปเดียว ถ้าเอาหลายรูปให้เอา event มาวนรูว
    // event.target.files คือ เนื้อข้อมูลข้างใน event
    for (let file of event.target.files) {
      this.mDetail.upfile.push(file)
    }

    //console.log(this.mDetail.upfile)

    //----- เป็นการนำรูปภาพมาใส่ในตัวแปร this.images โดยการ วนRoob 
    for (var i = 0; i < this.mDetail.upfile.length; i++) {
      // new FileReader() คือ object เอาไว้จัดการไฟล์
      var reader = new FileReader();
      reader.onload = (e: any) => this.images.push(e.target.result);
      // reader.readAsDataURL(this.mDetail.upfile[i]);
      reader.readAsDataURL(event.target.files[i]);
    }
    reader1: FileReader;
    // for (let file of event.target.files) {
    //   this.mDetail.upfile.push(file)

    //   var reader = new FileReader();
    //   reader.onload = e => (this.imageSrc01 = reader.result);
    //   reader.readAsDataURL(file);
    //   console.log("666" + this.imageSrc01)
    // }
  }
  RefreshImage() {
    this.images = []
    this.mDetail.upfile = [null];
  }
  //---------------------------------ทดสอบShowImage---------------------------------

  // onFileChange(event: any) {
  //   this.images = []
  //   if (event.target.files && event.target.files[0]) {
  //     var filesAmount = event.target.files.length;
  //     for (let i = 0; i < filesAmount; i++) {
  //       var reader = new FileReader();
  //       reader.onload = (event: any) => {
  //         console.log(event.target.result);
  //         this.images.push(event.target.result);
  //       }
  //       reader.readAsDataURL(event.target.files[i]);
  //     }
  //   }
  // }
  //-----------------------------------------------------------------------
}
