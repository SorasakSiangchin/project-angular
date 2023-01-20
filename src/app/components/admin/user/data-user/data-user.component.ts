import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Cs63Service } from 'src/app/service/cs63.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-user',
  templateUrl: './data-user.component.html',
  styleUrls: ['./data-user.component.css']
})

export class DataUserComponent implements AfterViewInit {
  Users: any
  displayedColumns: string[] = ['id', 'email', 'password', 'image', 'name', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private cs63: Cs63Service,private rout:Router) {
    // เอาข้อมูลใส่ใน this.Users
    this.Users = this.feedData()
    // เอาข้อมูลที่ได้ใส่ใน MatTableDataSource
    this.dataSource = new MatTableDataSource(this.Users);
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  //-----------------------ข้อมูลจากเบื้องหลัง-------------------------------
  feedData() {
    //subscribe ทำหน้าที่ติดตามผลลัพธ์ที่ส่งกลับมาเหมือน async/await
    this.cs63.getUser()
      // ถ้าสำเร็จจะกับมา data
      // data.map 
      // item.image ส่งชื่อรูปภาพ
      .subscribe(data => {
        data.map(item => item.image = this.cs63.getUserImageUrl(item.image))
        this.dataSource.data = data
      },
        error => {
          alert(JSON.stringify(error.error.message))
        },
        () => {
          console.log('complete')
        })
  }
  //----------------------------------------------------------------------

  //-------------- ไม่ต้องแก้เป็นของ material.angular ------------------------
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //------------------------------------------------------------------------

  //------------ เอาไว้เเก้ปัญหา รูปภาพ ให้มันเปลี่ยนเเปลง--------------------------
  public get timestamp(): string {
    return Date.now().toString()
  }
  //------------------------------------------------------------------------
  
  deleteUser(id: number) {
    Swal.fire({
      title: 'คุณจะลบหรือไม่?',
      text: "ลบไปแล้วไม่สามารถนำข้อมูลกลับมาได้!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ลบข้อมูล!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.cs63.deleteUser(id).toPromise().then(()=>{
          // this.feedData() คือการล้างค่าเก่า
          this.feedData()
        });
        
        
      }
    })
  }

  DetailUser(data: any) {
    Swal.fire({
      title: "<div class=armfont01>" + "ไอดี : " + "<span class=text-black>" + data.id + "</span>" + "<span>" + " | " + "ชื่อ : " + "<span class=text-black>" + data.name + "</span>" + "</span>" + "</div>" +
        "<div class=armfont01>" + "อีเมล : " + "<span class=text-black>" + data.email + "</span>" + "<span>" + " | " + "รหัสผ่าน : " + "<span class=text-black>" + data.password + "</span>" + "</span>" + "</div>" +
        "<div class=armfont01>" + "เบอร์โทร : " + "<span class=text-black>" + data.tel + "</span>" + "</div>" +
        "<div class=armfont01>" + "ที่อยู่: " + "<span class=text-black>" + data.address + "</span>" + "</div>"
      ,
      imageUrl: data.image,
      imageWidth: 400,
      imageHeight: 350,
      imageAlt: 'A tall image',
    })
  }

  onLogout(){
    localStorage.removeItem(environment.loginResultAdmin)
    this.rout.navigate(['']) 
  }

}

