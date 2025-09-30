import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IContact } from '../interfaces/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ConatctService {
  
  constructor(private http:HttpClient){}

  private baseUrl='http://localhost3000/contact'

  getContact(){
    return this.http.get<IContact[]>(`${this.baseUrl}`);
  }
  sendContact(contact:IContact){
    return this.http.post<IContact>(`${this.baseUrl}`,contact);
  }
  deleteContact(id:string){
    return this.http.delete<IContact>(`${this.baseUrl}/${id}`);
  }
}
