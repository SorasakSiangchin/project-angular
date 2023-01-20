import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TypeProduct } from 'src/app/Models/TypeProducts';
import { Cs63Service } from 'src/app/service/cs63.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
@Component({
  selector: 'app-edit-typeproduct',
  templateUrl: './edit-typeproduct.component.html',
  styleUrls: ['./edit-typeproduct.component.css']
})
export class EditTypeproductComponent implements OnInit {
  mTypeProduct!: TypeProduct
  constructor(private activatedRoute: ActivatedRoute, private cs63: Cs63Service, private location: Location) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      let id = params.id
      // this.rest.getProductById(id) ส่งidไป service
      this.mTypeProduct = await this.cs63.getTypeProductById(id).toPromise();
    })
  }

  EditTypeProduct(typeproductForm: any) {
    if (typeproductForm.invalid) return;
    this.cs63.updateTypeProduct(this.mTypeProduct).subscribe(
      response => {
        if (response.msg == this.cs63.OK) {
          Swal.fire({
            icon: 'success',
            title: 'แก้ไขข้อมูลเรียบร้อย',
            showConfirmButton: false,
            timer: 1500
          })
          this.location.back()
        } else {
          Swal.fire({
            icon: 'error',
            title: 'ไม่สามารถเพิ่มข้อมูล',
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
}
