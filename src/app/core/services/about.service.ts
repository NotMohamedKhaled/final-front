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
  updateBio(bio: IBio){
    return this.http.put<IBio>(`${this.baseUrl}/bio`, bio);
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
  addSkill(skill: ISkill){
    return this.http.post<ISkill>(`${this.baseUrl}/skills`, skill);
  }

  updateSkill(id: string, skill: ISkill){
    return this.http.put<ISkill>(`${this.baseUrl}/skills/${id}`, skill);
  }

  deleteSkill(id: string){
    return this.http.delete<void>(`${this.baseUrl}/skills/${id}`);
  }
  
}
