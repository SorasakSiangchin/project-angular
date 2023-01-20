import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cs63Service } from 'src/app/service/cs63.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { DetailProduct01 } from '../../../../Models/DetailProduct';

@Component({
  selector: 'app-edit-detailproduct',
  templateUrl: './edit-detailproduct.component.html',
  styleUrls: ['./edit-detailproduct.component.css']
})
export class EditDetailproductComponent implements OnInit {
  mDetailProduct!: any
  idProduct: any
  public imageSrc: any = null;
  backendUrl = environment.backendUrl;
  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private cs63: Cs63Service,
    private rout: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      var id = params.id
      this.mDetailProduct = await this.cs63.getDetailProductX2Byid(id).toPromise();
      this.idProduct = this.mDetailProduct.idProduct
      console.log(this.mDetailProduct)
    })
  }

  onEditDetailProduct(value: any) {
    if (value.invalid) return;
    this.cs63.updateDetailProduct(this.mDetailProduct).subscribe(
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

  onUploadImage(image: any) {
    this.mDetailProduct.upfile = image.target.files[0]; //upload to server
    // Show preview image
    if (this.mDetailProduct.upfile) {
      const reader = new FileReader();
      reader.onload = e => (this.imageSrc = reader.result);
      reader.readAsDataURL(this.mDetailProduct.upfile);
    }
  }

  public get timestamp(): string {
    return Date.now().toString()
  }

  onClickCancel() {
    this.location.back()
  }
}
