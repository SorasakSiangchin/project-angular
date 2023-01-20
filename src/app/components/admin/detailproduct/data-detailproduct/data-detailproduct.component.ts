import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cs63Service } from 'src/app/service/cs63.service';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-data-detailproduct',
  templateUrl: './data-detailproduct.component.html',
  styleUrls: ['./data-detailproduct.component.css']
})
export class DataDetailproductComponent implements AfterViewInit {
  DetailProduct: any
  displayedColumns: string[] = ['id', 'idProduct', 'image', 'weight', 'dataMore', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cs63: Cs63Service) {
    this.DetailProduct = this.feedData()
    this.dataSource = new MatTableDataSource(this.DetailProduct);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  feedData() {
    //subscribe ทำหน้าที่ติดตามผลลัพธ์ที่ส่งกลับมาเหมือน async/await
    this.cs63.getDetailProduct()
      // ถ้าสำเร็จจะกับมา data
      // data.map 
      // item.image ส่งชื่อรูปภาพ
      .subscribe(data => {
        data.map(item => item.image = this.cs63.getDetailProductImageUrl(item.image))
        console.log(data)
        this.dataSource.data = data
      },
        error => {
          alert(JSON.stringify(error.error.message))
        },
        () => {
          console.log('complete')
        })
  }

  //-------------- ไม่ต้องแก้เป็นของ material.angular ------------------------
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  //----------------------------------------------------------------------

  public get timestamp(): string {
    return Date.now().toString()
  }

  showDetail(data: any) {
    Swal.fire({
      title: '<strong >ไอดี : <u>' + data.id + '</u></strong>' + '<br/>' +
        '<strong >ข้อมูลเพิ่มเติม : <u class="text-primary">' + data.dataMore + '</u></strong>',
      imageUrl: data.image,
      imageHeight: 500,
      imageAlt: 'A tall image'
    })
  }

  deleteDetailProductId(id: string) {
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
        await this.cs63.deleteDetailProductId(id).toPromise().then(() => {
          // this.feedData() คือการล้างค่าเก่า
          this.feedData()
        });
      }
    })
  }
}
