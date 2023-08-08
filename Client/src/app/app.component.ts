import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { tokenModel } from './_models/tokenModel';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

 title: string = 'RentMovieVanzApp';
 
 constructor(private http: HttpClient, private accountService: AccountService) {}
  
  ngOnInit(): void {
    this.setCurrentToken();
  }

  setCurrentToken() {
    const token : tokenModel = JSON.parse(localStorage.getItem('token'));
    this.accountService.setCurrentToken(token);
  }
 
}
