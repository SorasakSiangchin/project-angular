import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cs63Service } from 'src/app/service/cs63.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements AfterViewInit {
  DataLists: any
  NumderList: any
  displayedColumns: string[] = ['id', 'idOrder', 'idProduck', 'priceProduct', 'numberProduct', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private cs63: Cs63Service, private http: HttpClient) {

    this.DataLists = this.feeddata()
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.DataLists);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


  }
  //---------------- เป็นของ Angular เอาไว้ค้นหาข้อมูลในหน้า HTML --------------
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //---------------------------------------------------------------------
  feeddata() {
    this.cs63.getListAll().subscribe(data => {
      this.dataSource.data = data
      this.NumderList = this.dataSource.data.length
    },
      error => {
        alert(JSON.stringify(error.error.message))
      },
      () => {
        console.log('complete')
      })
  }

  DeleteList(id: string) {
    Swal.fire({
      title: 'คุณจะลบหรือไม่?',
      text: "ลบไปแล้วไม่สามารถนำข้อมูลกลับมาได้!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ลบข้อมูล!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete<void>(`${this.cs63.ListUrl}/${id}`).subscribe(
          () => {
            this.feeddata()
          }
        )

      }
    })

  }
}

