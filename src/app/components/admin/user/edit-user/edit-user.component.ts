import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/๊Users';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Cs63Service } from 'src/app/service/cs63.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.prod';
//import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  mUser!: User
  public imageSrc: any = null;
  backendUrl = environment.backendUrl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private cs63: Cs63Service,
    private rout:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      let id = params.id
      // this.rest.getProductById(id) ส่งidไป service
      this.mUser = await this.cs63.getUserById(id).toPromise();
    })
  }

  onClickCancel() {
    this.location.back()
  }
  onLogout(){
    localStorage.removeItem(environment.loginResultAdmin)
    this.rout.navigate(['']) 
  }

  onEditUser(userForm: any) {

    if (userForm.invalid) return

    // this.rest.updateProduct(this.mProduct) การส่งไปแก้ไข
    //subscribe ทำหน้าที่ติดตามผลลัพธ์ที่ส่งกลับมาเหมือน async/await
    this.cs63.updateUser(this.mUser).subscribe(
      (response) => {
        if (response.msg == this.cs63.OK) {
          this.location.back()
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
          })
        }
      },
      (error) => {
        alert('Http Error')
      }
    )
  }

  onUploadImage(event: any) {
    this.mUser.upfile = event.target.files[0]; //upload to server

    // Show preview image
    if (this.mUser.upfile) {
      const reader = new FileReader();
      reader.onload = e => (this.imageSrc = reader.result);
      reader.readAsDataURL(this.mUser.upfile);
    }
  }

  public get timestamp(): string {
    return Date.now().toString()
  }

}
