import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cs63Service } from 'src/app/service/cs63.service';
import { environment } from 'src/environments/environment';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})
export class LoginadminComponent implements OnInit {
  hide = true;
  value = '';
  isError: any
  constructor(private cs63: Cs63Service, private router: Router, private location: Location) { }

  ngOnInit(): void {
  }
  async onSubmit(values: any) {
    // try catch มีไว้ดัก Error
    try {
      // toPromise เเปลว่า คำหมั้นสัณญา ว่าเราไปที่ server เเล้วต้องมีผลลัพกลับมา
      let result = await this.cs63.loginAdmin(values).toPromise()
      if (result.msg == this.cs63.OK) {
        Swal.fire(
          'เข้าสู่ระบบสำเร็จ!',
          'ยิดดีต้อนรับ',
          'success'
        )
        // บันทึก ไว้ในเครื่อง
        localStorage.setItem(environment.loginResultAdmin, this.cs63.OK)


        this.isError = null
        this.router.navigate(["menuadmin/indexadmin"])

      } else {  
        this.isError = result.msg
        Swal.fire({
          icon: 'error',
          title: this.isError,
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title:'Http Error',
      })
      this.isError = 'Http Error'
    }
  }

  Back() {
    this.location.back()
  }
}
