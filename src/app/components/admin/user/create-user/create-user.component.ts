import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/๊Users';
import { Cs63Service } from 'src/app/service/cs63.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent implements OnInit {
  public imageSrc: any = null;
  mUser: User = {
    id:"",
    name: "",
    email: "",
    password: "",
    address: "",
    tel: "",
    image: "",
    // upfile ส่งให้ server
    upfile: null
  }
  constructor(private cs63:Cs63Service , private rout:Router , private location:Location) { }

  ngOnInit(): void {
  }
  //------------------
  onAddUser(userForm: any) {
    if (userForm.invalid) return;
    this.cs63.addUser(this.mUser).subscribe(
      (response) => {
        if (response.msg == this.cs63.OK) {
          Swal.fire({
            icon: 'success',
            title: 'เพิ่มสมาชิกเรียบร้อย',
            showConfirmButton: false,
            timer: 1500
          })
          this.location.back()
        
        } else {
          Swal.fire({
            icon: 'error',
            title: 'ไม่สามารถเพิ่มสมาชิกได้',
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
  //----------------------------------------------------
  onUploadImage(event: any) {
    // event.target.files[0]; เอาแค่รูปเดียว ถ้าเอาหลายรูปให้เอา event มาวนรูว
    this.mUser.upfile = event.target.files[0]; //upload to server
    // Show preview image หรือ เอารูปมาแสดง
    if (this.mUser.upfile) {
      // FileReader แปลว่าโปรแกรมอ่านไฟล์
      const reader = new FileReader();
      // result แปลว่า ผลลัพธ์
      reader.onload = e => (this.imageSrc = reader.result);
      // อ่านค่า
      reader.readAsDataURL(this.mUser.upfile);
    }
  }

  onClickCancel() {
    this.location.back()
  }

  arm(){
    this.mUser.id=""
  }
}
