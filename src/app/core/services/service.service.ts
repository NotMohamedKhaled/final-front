import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IService } from '../interfaces/service.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient){}

  private readonly baseUrl = 'http://localhost:3000/service';

  getServicesByHttp(){
    return this.http.get<IService[]>(`${this.baseUrl}`);
  }

  addService(service: IService){
    return this.http.post<IService>(`${this.baseUrl}`, service);
  }

  updateService(id: string, service: IService){
    return this.http.put<IService>(`${this.baseUrl}/${id}`, service);
  }

  deleteService(id: string){
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
