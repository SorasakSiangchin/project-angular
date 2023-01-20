import { Component, OnInit } from '@angular/core';
import { Cs63Service } from 'src/app/service/cs63.service';
import { environment } from 'src/environments/environment';
import {FormControl, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
//import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  public imageSrc: any = null;
  status = false
  // mUser:User = {
  //   id!:"",
  //   name!:"",
  //   email!:"",
  //   password!:"",
  //   address!:"",
  //   tel!:"",
  //   image!:"",
  //   upfile:""
  // }
  UserId: any
  DataUser!: any
  backendUrl = environment.backendUrl;
  constructor(private cs63: Cs63Service) { }

  ngOnInit(): void {

    this.feeddata()
  }

  feeddata() {
    this.UserId = localStorage.getItem("UserID")
    this.cs63.getUserDataById(this.UserId).toPromise().then((data)=>{
      this.DataUser = data
      console.log(this.DataUser)
    })
  }

  onEditUser(value:any){
    if (value.invalid) return
    this.cs63.updateUser(this.DataUser).subscribe(
      (response) => {
        if (response.msg == this.cs63.OK) {
          this.status = !this.status
          this.feeddata()
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

  public get timestamp(): string {
    return Date.now().toString()
  }

  onUploadImage(image:any){
    this.DataUser.upfile = image.target.files[0]; //upload to server

    // Show preview image
    if (this.DataUser.upfile) {
      const reader = new FileReader();
      reader.onload = e => (this.imageSrc = reader.result);
      reader.readAsDataURL(this.DataUser.upfile);
    }
  }
}
