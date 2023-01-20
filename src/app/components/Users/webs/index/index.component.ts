import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cs63Service } from 'src/app/service/cs63.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { User } from 'src/app/Models/๊Users';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  mUser: User = {
    id: "",
    name: "",
    email: "",
    password: "",
    address: "",
    tel: "",
    image: "",
    // upfile ส่งให้ server
    upfile: null
  }
  UserId: any
  data: any
  public imageSrc: any = null;
  isError: any
  isError01: any
  backendUrl = environment.backendUrl;
  constructor(private cs63: Cs63Service, private router: Router, private location: Location) { }

  ngOnInit(): void {
  }



  //------------------login----------------------------
  async onSubmit(values: any) {
    // try catch มีไว้ดัก Error
    try {
      // toPromise เเปลว่า คำหมั้นสัณญา ว่าเราไปที่ server เเล้วต้องมีผลลัพกลับมา
      let result = await this.cs63.login(values).toPromise()
      this.UserId = result.uid
      if (result.msg == this.cs63.OK) {
        Swal.fire(
          'เข้าสู่ระบบสำเร็จ!',
          'ยิดดีต้อนรับ',
          'success'
        )
        // บันทึก ไว้ในเครื่อง
        localStorage.setItem(environment.loginResult, this.cs63.OK)
        localStorage.setItem("UserID", this.UserId)
        this.isError = null
        this.router.navigate(["index"])
        
      } else {
        this.isError = result.msg
      }
    } catch (error) {
      this.isError = 'Http Error'
    }
  }
  //---------------------------------------------------

  //------------------
  async onAddUser(userForm: any) {
    if (userForm.invalid) return;
    await this.cs63.addUser(this.mUser).subscribe(
      (response) => {
        if (response.msg == this.cs63.OK) {
          Swal.fire({
            icon: 'success',
            title: 'สมัครสำเร็จ',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate([""])
          this.mUser.id = ""
          this.mUser.name = ""
          this.mUser.email = ""
          this.mUser.password = ""
          this.mUser.address = ""
          this.mUser.tel = ""
          this.mUser.image = ""
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
  //----------------------------------------------------
}
