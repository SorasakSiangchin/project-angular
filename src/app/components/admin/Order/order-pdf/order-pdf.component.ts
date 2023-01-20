import { Location } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from 'jspdf';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GetOrder, DataList } from '../../../../Models/Orders&Lists';
import { Cs63Service } from 'src/app/service/cs63.service';

@Component({
  selector: 'app-order-pdf',
  templateUrl: './order-pdf.component.html',
  styleUrls: ['./order-pdf.component.css']
})
export class OrderPdfComponent implements OnInit {
  DataList:DataList[]=[]
  DataOrder!:GetOrder
  dateOpen = Date.now()
  constructor(private location: Location, private activatedroute: ActivatedRoute , private http:HttpClient , private cs63:Cs63Service) {
    this.activatedroute.params.subscribe(async params => {
      let id = params.id
      this.http.get<any>(`${this.cs63.OrderX2Url}/${id}`).subscribe(data=>{
        this.DataOrder = data
        console.log("Order"+""+JSON.stringify(this.DataOrder))
      })
      this.http.get<any>(`${this.cs63.ListUrl}/${id}`).subscribe(data=>{
        
        this.DataList = data
       //console.log("List"+""+JSON.stringify(data))
      });
    })
  }
  // @ViewChild เก็บข้อมูลเพื่อนำไปแสดง
  @ViewChild('content', { static: false }) el!: ElementRef;

  ngOnInit(): void {
  }

  OrderPDF() {
   let pdf = new jsPDF('p', 'pt', 'a4')
   pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("Order.pdf");
      }
    });
  }

  back() {
    this.location.back()
  }

  
}
