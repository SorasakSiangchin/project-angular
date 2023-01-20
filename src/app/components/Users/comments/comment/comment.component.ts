import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentUpfile } from '../../../../Models/Comment';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { Cs63Service } from 'src/app/service/cs63.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})

export class CommentComponent implements OnInit {
  //------- เก็บไอดีผู้ใช้ -------------
  IdUer!: number

  public imageSrc: any = null;

  mCommentUpfile: CommentUpfile = {
    id: "",
    idUser: 0,
    date: "",
    dataComment: "",
    adminComment: "",
    image: "",
    Upfile: ""
  }
  constructor(private http: HttpClient, private location: Location ,private cs63:Cs63Service) { }

  ngOnInit(): void {
    this.IdUer = JSON.parse(localStorage.getItem("UserID")!);
    this.mCommentUpfile.idUser = this.IdUer
  }

  

  onUploadImage(event: any) {
    // event.target.files[0]; เอาแค่รูปเดียว ถ้าเอาหลายรูปให้เอา event มาวนรูว
    this.mCommentUpfile.Upfile = event.target.files[0]; //upload to server
    // Show preview image หรือ เอารูปมาแสดง
    if (this.mCommentUpfile.Upfile) {
      // FileReader แปลว่าโปรแกรมอ่านไฟล์
      const reader = new FileReader();
      // result แปลว่า ผลลัพธ์
      reader.onload = e => (this.imageSrc = reader.result);
      // อ่านค่า
      reader.readAsDataURL(this.mCommentUpfile.Upfile);
    }
  }

  ImageShow(value: any) {
    Swal.fire({
      title: '<div class="armfont01">' + 'รูปภาพ!' + '</div>',
      imageUrl: value,
      imageWidth: 500,
      imageHeight: 400,
      imageAlt: 'Custom image',
    })
  }

  onAddComment(commentForm: any) {
    if (commentForm.invalid) return;
    let formData = new FormData()
    formData.append('id', this.mCommentUpfile.id)
    formData.append('idUser', this.mCommentUpfile.idUser.toString())
    formData.append('date', this.mCommentUpfile.date)
    if (this.mCommentUpfile.dataComment == null) this.mCommentUpfile.dataComment = ""
    formData.append('dataComment', this.mCommentUpfile.dataComment)
    formData.append('adminComment', this.mCommentUpfile.adminComment)
    if (this.mCommentUpfile.image == null) this.mCommentUpfile.image = ""
    formData.append('image', this.mCommentUpfile.image)
    formData.append('UpFile', this.mCommentUpfile.Upfile)

    this.http.post<any>(this.cs63.commentUrl, formData).subscribe((data) => {
      if (data.msg == "OK") {
        Swal.fire({
          icon: 'success',
          title: '<div class="armfont01">' + 'ส่งข้อมูลเรียบ100' + '</div>',
          showConfirmButton: false,
          timer: 1400
        }).then(()=>{
          this.mCommentUpfile.dataComment = ""
          this.imageSrc = ""
        })
      }
    })
  }

  onClickCancel() {
    this.location.back()
  }
}
