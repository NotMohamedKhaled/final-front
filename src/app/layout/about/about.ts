import { Component, OnInit } from '@angular/core';
import { IAboutPage } from '../../core/interfaces/aboutPage.interface';
import { AboutService } from '../../core/services/about.service';
import { Bio } from './bio/bio';
import { Education } from './education/education';
import { Skill } from './skill/skill';

@Component({
  selector: 'app-about',
  imports: [Bio, Education,Skill],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit{
  constructor(private aboutService:AboutService){}

aboutPageData!:IAboutPage;

ngOnInit(): void {
  this.aboutService.getAboutData().subscribe(data=>{
    this.aboutPageData=data;
    console.log(this.aboutPageData);
    
  })
}


}
