import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { Cs63Service } from 'src/app/service/cs63.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-data-product',
  templateUrl: './data-product.component.html',
  styleUrls: ['./data-product.component.css']
})
export class DataProductComponent implements AfterViewInit {
  Product: any
  displayedColumns: string[] = ['id', 'idTypeProductNavigation.name', 'name', 'price', 'image', 'stock', 'color', 'shape', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cs63: Cs63Service) {
    // เอาข้อมูลใส่ใน this.Product
    this.Product = this.feedData()
    // เอาข้อมูลที่ได้ใส่ใน MatTableDataSource
    this.dataSource = new MatTableDataSource(this.Product);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  feedData() {
    //subscribe ทำหน้าที่ติดตามผลลัพธ์ที่ส่งกลับมาเหมือน async/await
    this.cs63.getProductInclude()
      // ถ้าสำเร็จจะกับมา data
      // data.map 
      // item.image ส่งชื่อรูปภาพ
      .subscribe(data => {
        data.map(item => item.image = this.cs63.getProductImageUrl(item.image))
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

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //----------------------------------------------------------------------
  public get timestamp(): string {
    return Date.now().toString()
  }

  DetailProduct(data: any) {
    Swal.fire({
      title: 'รูปภาพ',
      imageUrl: data.image,
      imageWidth: 400,
      imageHeight: 350,
      imageAlt: 'Custom image',
    })
  }
  deleteProduct(id: number) {
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
        await this.cs63.deleteProduct(id).subscribe(() => {
          // this.feedData() คือการล้างค่าเก่า
          this.feedData()
        });
      } 
    })
  }

  detailProduct(id: number) {
    this.cs63.getDetailProductByid(id).subscribe(data => {
      console.log(data)
    })
  }

}



