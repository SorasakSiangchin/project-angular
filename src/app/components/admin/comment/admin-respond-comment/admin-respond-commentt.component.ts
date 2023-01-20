import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cs63Service } from 'src/app/service/cs63.service';
import Swal from 'sweetalert2';
import { CommentAdmin, CommentModel } from '../../../../Models/Comment';


@Component({
  selector: 'app-admin-respond-commentt',
  templateUrl: './admin-respond-commentt.component.html',
  styleUrls: ['./admin-respond-commentt.component.css']
})
export class AdminRespondCommenttComponent implements OnInit {
  mComment: CommentAdmin = {
    id: "",
    idUser: 0,
    date: "",
    dataComment: "",
    adminComment: "",
    image: "",
  }
  DataComment: any
  constructor(private activatedroute: ActivatedRoute, private http: HttpClient,private cs63:Cs63Service) {
    this.activatedroute.params.subscribe(async params => {
      this.mComment.idUser = params.id
      this.http.get<any>(`${this.cs63.commentUrl}/${this.mComment.idUser}`).subscribe(data => {
        this.DataComment = data
        this.mComment.id = this.DataComment.id
      })
    })
  }

  ngOnInit(): void {
  }
  onAddComment(value: any) {
    if (value.invalid) return;
    const formData = new FormData()
    formData.append("id", `${this.mComment.id}`);
    formData.append("adminComment", `${this.mComment.adminComment}`);
    this.http.put<any>(`${this.cs63.commentUrl}`,formData).subscribe(
        (response) => {
          if (response.msg == "OK") {
            Swal.fire({
              icon: 'success',
              title: '<div class="armfontX2">'+'ตอบกลับเรียบร้อย'+'</div>',
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'ไม่พบสินค้า',
              text: 'Something went wrong!',
              footer: '<a href>Why do I have this issue?</a>'
            })
          }
        },
        (error) => {
          alert('Http Error')
        }
      );
    // this.cs63.updateProduct(this.mProduct).subscribe(
    //   (response) => {
    //     if (response.msg == this.cs63.OK) {
    //       this.location.back()
    //     } else {
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'ไม่พบสินค้า',
    //         text: 'Something went wrong!',
    //         footer: '<a href>Why do I have this issue?</a>'
    //       })
    //     }
    //   },
    //   (error) => {
    //     alert('Http Error')
    //   }
    // )
  }
}
