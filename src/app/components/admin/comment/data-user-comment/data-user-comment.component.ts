import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cs63Service } from 'src/app/service/cs63.service';
import { User } from '../../../../Models/๊Users';

@Component({
  selector: 'app-data-user-comment',
  templateUrl: './data-user-comment.component.html',
  styleUrls: ['./data-user-comment.component.css']
})
export class DataUserCommentComponent implements OnInit {
  DataUser!: User
  
  constructor(private activatedroute: ActivatedRoute, private http: HttpClient , private location:Location,private cs63:Cs63Service) {
    this.activatedroute.params.subscribe(async params => {
      let id = params.id
      this.DataUser = await this.http.get<any>(`${this.cs63.authenApiUrl}/${id}`).toPromise()
    })
  }

  ngOnInit(): void {
  }
  
  back(){
    this.location.back()
  }
}
