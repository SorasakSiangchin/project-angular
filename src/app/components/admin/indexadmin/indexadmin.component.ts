import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-indexadmin',
  templateUrl: './indexadmin.component.html',
  styleUrls: ['./indexadmin.component.css']
})
export class IndexadminComponent implements OnInit {

  constructor(private rout:Router) { }

  ngOnInit(): void {
  }
  onLogout(){
    localStorage.removeItem(environment.loginResultAdmin)
    this.rout.navigate(['']) 
  }

}
