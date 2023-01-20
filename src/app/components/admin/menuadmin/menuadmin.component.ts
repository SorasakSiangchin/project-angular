import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menuadmin',
  templateUrl: './menuadmin.component.html',
  styleUrls: ['./menuadmin.component.css']
})
export class MenuadminComponent implements OnInit {

  constructor(private rout:Router) { }

  ngOnInit(): void {
  }
  onLogout(){
    localStorage.removeItem(environment.loginResultAdmin)
    this.rout.navigate(['']) 
  }
}
