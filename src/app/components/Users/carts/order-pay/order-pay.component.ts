import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { environment } from 'src/environments/environment.prod';
//import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { OrderUpfile } from '../../../../Models/Orders&Lists';

@Component({
  selector: 'app-order-pay',
  templateUrl: './order-pay.component.html',
  styleUrls: ['./order-pay.component.css']
})
export class OrderPayComponent implements OnInit {
  public imageSrc: any 

  UpFileOrder!: OrderUpfile

  public imageShow!:"";
  public backendUrl = environment.backendUrl;
  constructor(private activatedroute: ActivatedRoute, private cart: CartService, private location: Location) {
    //---------ดึกข้อมูลมาแสดง-------------------------------
    this.activatedroute.params.subscribe(async params => {
      let id = params.id
      this.cart.getByIdOrder(id).subscribe(data => {
        this.UpFileOrder = data
        //console.log("555" + JSON.stringify(this.UpFileOrder))
      })
    })
  }

  ngOnInit(): void {
  }
  
  onUploadImage(event: any) {
    // event.target.files[0]; เอาแค่รูปเดียว ถ้าเอาหลายรูปให้เอา event มาวนรูว
    this.UpFileOrder.upfile = event.target.files[0]; //upload to server
    // Show preview image หรือ เอารูปมาแสดง
    if (this.UpFileOrder.upfile) {
      // FileReader แปลว่าโปรแกรมอ่านไฟล์
      const reader = new FileReader();
      // result แปลว่า ผลลัพธ์
      reader.onload = () => (this.imageSrc = reader.result);
      // อ่านค่า
      reader.readAsDataURL(this.UpFileOrder.upfile);
    }
  }

  onClickCancel() {
    this.location.back()
  }
  
  //-----------------------sweetalert Show image-------
  ShowImahe(image: any) {
    Swal.fire({
      title: '<div class="armfont01">' + 'รูปภาพหลักฐาน!' + '</div>',
      imageUrl: image,
      imageWidth: 400,
      imageHeight: 300,
      imageAlt: 'Custom image',
    })
  }
  ShowImahe01(image: any) {
    image = `${this.backendUrl}${image}`;
    Swal.fire({
      title: '<div class="armfont01">' + 'รูปภาพหลักฐาน!' + '</div>',
      imageUrl: image,
      imageWidth: 400,
      imageHeight: 300,
      imageAlt: 'Custom image',
    })
  }
  //-----------------ส่งข้อมูลไปบันทึก-----------------------
  AddFile() {
    this.cart.makeFormUpFileOrder(this.UpFileOrder)
  }
  
  public get timestamp(): string {
    return Date.now().toString()
  }
}
