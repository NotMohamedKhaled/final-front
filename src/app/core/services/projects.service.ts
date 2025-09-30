import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProject } from '../interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private http: HttpClient){}

  private baseUrl='http://localhost:3000/project/';

getProductsByHttp(){
  return this.http.get<IProject[]>(`${this.baseUrl}`);
}  

addProject(project:IProject){
  return this.http.post<IProject>(`${this.baseUrl}`,project);
}
updateProject(id:string,project: IProject){
  return this.http.put<IProject>(`${this.baseUrl}+/${id}`,project);
}
deleteProject(id:string){
  return this.http.delete<IProject>(`${this.baseUrl}+/${id}`);
}

}
