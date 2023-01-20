import { Component, OnInit } from '@angular/core';
import { TypeProduct } from 'src/app/Models/TypeProducts';
import { Cs63Service } from 'src/app/service/cs63.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-data-typeproduct',
  templateUrl: './data-typeproduct.component.html',
  styleUrls: ['./data-typeproduct.component.css']
})
export class DataTypeproductComponent implements OnInit {
  
  constructor(private cs63:Cs63Service) { }


  typeproduct!:TypeProduct[]

  ngOnInit(): void {
    this.feedTypeProduct()
  }

  feedTypeProduct() {
    this.cs63.getTypeProduct().subscribe(data => {
     this.typeproduct = data
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
        await this.cs63.deleteTypeProduct(id).toPromise().then(()=>{
          // this.feedData() คือการล้างค่าเก่า
          this.feedTypeProduct()
        });
      }
    })
  }


}
