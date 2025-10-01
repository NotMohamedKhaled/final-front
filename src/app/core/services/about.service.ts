import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAboutPage, IBio, IEducation, ISkill } from '../interfaces/aboutPage.interface';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private readonly baseUrl = 'http://localhost:3000/about';

  constructor( private http:HttpClient){}

  getAboutData(){
    return this.http.get<IAboutPage>(`${this.baseUrl}`);
  }

  // Bio
  updateBio(bio: IBio , file: File){
    const formData = new FormData();
    formData.append('title', bio.title);
    formData.append('paragraph', bio.paragraph);
   if(file){
    formData.append('bioImage',file);
   }
    return this.http.post<IBio>(`${this.baseUrl}/bio`, formData);
  }

  // Education
  addEducation(education: IEducation){
   
    return this.http.post<IEducation>(`${this.baseUrl}/education`, education);
  }

  updateEducation(id: string, education: IEducation){
    return this.http.put<IEducation>(`${this.baseUrl}/education/${id}`, education);
  }

  deleteEducation(id: string){
    return this.http.delete<void>(`${this.baseUrl}/education/${id}`);
  }

  // Skills
  addSkill(skill: ISkill, file: File | undefined) {
    const formData = new FormData();
    formData.append('name', skill.name);
    formData.append('level', skill.level);
    if (file) {
      formData.append('skillIcon', file); // key must match backend multer field name
    }
    return this.http.post<ISkill>(`${this.baseUrl}/skills`, formData);
  }

  updateSkill(id: string, skill: ISkill, file?: File) {
    const formData = new FormData();
    formData.append('name', skill.name);
    formData.append('level', skill.level);
    if (file) {
      formData.append('skillIcon', file);
    }
    return this.http.put<ISkill>(`${this.baseUrl}/skills/${id}`, formData);
  }

  deleteSkill(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/skills/${id}`);
  }
  
}
