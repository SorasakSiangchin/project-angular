import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Cs63Service } from 'src/app/service/cs63.service';
import Swal from 'sweetalert2';
import { CommentModel } from '../../../../Models/Comment';


@Component({
  selector: 'app-data-comment',
  templateUrl: './data-comment.component.html',
  styleUrls: ['./data-comment.component.css']
})
export class DataCommentComponent implements AfterViewInit {
  //---------------- ของ Angular ---------------------
  displayedColumns: string[] = ['id', 'date', 'dataComment', 'image', 'action'];
  exampleDatabase!: ExampleHttpDatabase | null;
  data: GithubIssue[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  //-------------------------------------------------- 

  //------- เก็บข้อมูลเพื่อเอามาแสดง ----
  DataComment: CommentModel[] = []

  //------ เก็บไอดีผู้ใช้งาน ------
  IdUer: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _httpClient: HttpClient , private cs63:Cs63Service) { }

  ngAfterViewInit() {
    //--------------------- อ่านไอดีจาก local -----------------
    this.IdUer = JSON.parse(localStorage.getItem("UserID")!);
    this.feedDataComment(this.IdUer)
    //-------------------------------------------------------

    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    //----------- เป็นของ Angular -------------------
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex)
            .pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.total_count;
          return data.items;
        })
      ).subscribe(data => this.data = data);
  }


  feedDataComment(idUser: number) {
    this._httpClient.get<any>(`${this.cs63.commentX2Url}/${idUser}`).subscribe(data => {
      data.map((item: any) => item.image = this.ImageMap(item.image))
      this.DataComment = data
      //console.log("555"+this.DataComment)
    }, error => {
      alert(JSON.stringify(error.error.message))
    },
      () => {
        console.log('complete')
      })
  }

  ImageMap(value: any) {
    if (value) return `${this.cs63.hostUrl}${value}`;
    return "assets/img/no-image.jpg";
  }

  public get timestamp(): string {
    return Date.now().toString()
  }

  DetailComment(data: any) {
    Swal.fire({
      title: '<div class="armfont01">' + '<strong>' + 'ไอดี : ' + '</strong>' + data.id + '</div>' +
        '<div class="armfont01">' + '<strong>' + 'วันที่ส่ง : ' + '</strong>' + data.date + '</div>' +
        '<div class="armfont01">' + '<strong>' + 'ข้อความที่ส่ง : ' + '</strong>' + data.dataComment + '</div>',
      imageUrl: data.image,
      imageWidth: 400,
      imageHeight: 300,
      imageAlt: 'Custom image',
    })
  }

  DataCommentAdmin(data: any) {
    Swal.fire({
      title: '<div class="armfont01 text-center">' + 'ข้อความที่ตอบกลับ' + '</div>' + data.adminComment,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  }

  DeleteComment(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        ).then(() => {
          this._httpClient.delete<void>(`${this.cs63.commentUrl}/${id}`).subscribe(() => {
            this.feedDataComment(this.IdUer)
          })
        })
      }
    })
  }
}
//----------- เป็นของ Angular -------------------
export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}
//----------- เป็นของ Angular -------------------
export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

//----------- เป็นของ Angular -------------------
export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) { }

  getRepoIssues(sort: string, order: SortDirection, page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl =
      `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;

    return this._httpClient.get<GithubApi>(requestUrl);
  }
}