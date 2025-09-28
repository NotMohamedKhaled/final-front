import { Component, Input } from '@angular/core';
import { IProject } from '../../../core/interfaces/project.interface';



@Component({
  selector: 'app-project',
  imports: [],
  templateUrl: './project.html',
  styleUrl: './project.css'
})


export class Project {
  

  @Input() myProject!: IProject;

}
