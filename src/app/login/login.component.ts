import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import {Router} from '@angular/router';
import { LocaleService } from '../locale.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public selectedResource:any = {};
  public totalLocaleList= [];
  public selectedPassword:string = "";
  languageList:SelectItem[] =[];
  selectedCar:string = "";
  constructor(private localeService:LocaleService, private route:Router) { }

  ngOnInit() {
    this.localeService.getResourceDetails().then((data) => this.setResourceList(data) );
  }

  //Set the selected locale on page load
  setResourceList (data) {
    this.selectedResource = data.selectedLocale;
    this.totalLocaleList = data.totalLocaleList;
    this.totalLocaleList.forEach((item)=> {
      this.languageList.push({
        label : item.language + " (" + item.code + ") ",
        value: item.id
      })
    })
  }

  //Update selected locale when user change
  languageChange(selectedValue) {
    this.selectedResource = this.localeService.setSelectedLocale(selectedValue);
  }

  loginClick(){
    if(this.selectedPassword === "LAM123") {
      this.route.navigate(["/landing"]);
    }
  }

}
