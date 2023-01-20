import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommentModel } from 'src/app/Models/Comment';
import { Cs63Service } from 'src/app/service/cs63.service';


@Component({
  selector: 'app-data-comments',
  templateUrl: './data-comments.component.html',
  styleUrls: ['./data-comments.component.css']
})
export class DataCommentsComponent implements AfterViewInit {


  DataComment: CommentModel[] = []

  imageShow:boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient,private cs63:Cs63Service) {

  }

  ngAfterViewInit(): void {
    this.feedComments()
  }

  feedComments() {
    this.http.get<any>(this.cs63.commentUrl).subscribe(data => {
      //---------- เป็นการแก้ไขข้อมูลใน Databate --------------------
      data.map((item: any) => item.image = this.Dataimage(item.image))
      data.map((item: any) => item.idUserNavigation.image = this.Dataimage(item.idUserNavigation.image))
      //---------------------------------------------------------

      this.DataComment = data
    }, error => {
      alert(JSON.stringify(error.error.message))
    },
      () => {
        console.log('complete')
      })
  }

  public get timestamp(): string {
    return Date.now().toString()
  }

  Dataimage(image: any) {
    if (image) return `${this.cs63.hostUrl}/${image}`;
    return "assets/img/no-image.jpg";
  }

  
}

