import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAboutPage } from '../interfaces/aboutPage.interface';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  constructor( private http:HttpClient){}


  getAboutData(){
  return  this.http.get<IAboutPage>('http://localhost:3000/about');

  }
  
}
