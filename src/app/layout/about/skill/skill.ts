import { Component, Input } from '@angular/core';
import { ISkill } from '../../../core/interfaces/aboutPage.interface';

@Component({
  selector: 'app-skill',
  imports: [],
  templateUrl: './skill.html',
  styleUrl: './skill.css'
})
export class Skill {
  @Input() mySkill!:ISkill;
  

}
