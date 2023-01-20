import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { Cs63Service } from 'src/app/service/cs63.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public cs63: Cs63Service, private rout: Router, public cart: CartService) { }
  //-- เก็บไอดี จาก local -----
  UserId:any
  //-------------------------

  //-- เก็บข้อมูลจาก backend --
  DataUser:any
  //------------------------

  backendUrl = environment.backendUrl;
  ngOnInit(): void {
    this.cart.numberLocal()
    this.UserId = localStorage.getItem("UserID")
    this.cs63.getUserDataById(this.UserId).toPromise().then((data)=>{
      this.DataUser = data
    })
  }

  onLogout() {
    localStorage.removeItem(environment.loginResult)
    localStorage.removeItem("UserID")
    this.rout.navigate([''])
  }
  
  public get timestamp(): string {
    return Date.now().toString()
  }

}
