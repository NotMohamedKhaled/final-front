import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProject } from '../interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private http: HttpClient){}

  private baseUrl='http://localhost:3000/project';

getProductsByHttp(){
  
  return this.http.get<IProject[]>(`${this.baseUrl}`);
}  

addProject(project:IProject, file?: File){
  const formData = new FormData();
  formData.append('name', project.name);
  formData.append('desc', project.desc);
  formData.append('tech', project.tech);
  formData.append('demoLink', project.demoLink);
  if (file) {
    formData.append('projectImage', file);
  }
  return this.http.post<IProject>(`${this.baseUrl}`, formData);
}
updateProject(id:string, project: IProject, file?: File){
  const formData = new FormData();
  formData.append('name', project.name);
  formData.append('desc', project.desc);
  formData.append('tech', project.tech);
  formData.append('demoLink', project.demoLink);
  if (file) {
    formData.append('projectImage', file);
  }
  return this.http.put<IProject>(`${this.baseUrl}/${id}`, formData);
}
deleteProject(id:string){
  return this.http.delete<IProject>(`${this.baseUrl}/${id}`);
}

}
