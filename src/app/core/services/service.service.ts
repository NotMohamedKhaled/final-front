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

  addService(service: IService,file?:File){
    const formData = new FormData();
    formData.append('name', service.name);
    formData.append('desc', service.desc);
    if(file){
      formData.append('serviceImage',file);
    }

    return this.http.post<IService>(`${this.baseUrl}`, formData);
  }

  updateService(id: string, service: IService , file?:File){
    const formData = new FormData();
    formData.append('name', service.name);
    formData.append('desc', service.desc);
    if(file){
      formData.append('serviceImage',file);
    }
    return this.http.put<IService>(`${this.baseUrl}/${id}`, formData);
  }

  deleteService(id: string){
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
