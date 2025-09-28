import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProject } from '../interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private http: HttpClient){

  }

getProductsByHttp(){
  return this.http.get<IProject[]>('http://localhost:3000/project/');
}  
  
}
