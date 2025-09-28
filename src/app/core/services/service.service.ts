import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IService } from '../interfaces/service.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient){}

  getServicesByHttp(){
    return this.http.get<IService[]>('http://localhost:3000/service');
  }
}
