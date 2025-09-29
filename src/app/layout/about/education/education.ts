import { Component, Input } from '@angular/core';
import { IEducation } from '../../../core/interfaces/aboutPage.interface';

@Component({
  selector: 'app-education',
  imports: [],
  templateUrl: './education.html',
  styleUrl: './education.css'
})
export class Education {
  @Input() educationData!:IEducation[];
  

}
