import { Component, OnInit } from '@angular/core';
import { Project } from './project/project';
import { IProject } from '../../core/interfaces/project.interface';
import { ProjectsService } from '../../core/services/projects.service';

@Component({
  selector: 'app-projects',
  imports: [Project],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects implements OnInit {

  constructor(private projectsService: ProjectsService){}

  projects!:IProject[]; 


  ngOnInit(): void {  
  this.projectsService.getProductsByHttp().subscribe(data=>{
    this.projects=data;
  });
 }



 //  [
  //   {
  //     name: "project 1 ",
  //     desc: 'desc 1',
  //     tech: 'angular nodejs express mongodb',
  //     demoLink: 'https://google.com',
  //     imgUrl: 'icons8-chatgpt-50.png'
  //   },

  //   {
  //     name: "project 2 ",
  //     desc: 'desc 2',
  //     tech: 'tech 2',
  //     demoLink: 'link 2',
  //     imgUrl: 'img2'
  //   },
  //   {
  //     name: "project 3 ",
  //     desc: 'desc 3',
  //     tech: 'tech 3',
  //     demoLink: 'link 3',
  //     imgUrl: 'img3'
  //   },
  //   {
  //     name: "project 4 ",
  //     desc: 'desc 4',
  //     tech: 'tech 4',
  //     demoLink: 'link 4',
  //     imgUrl: 'img4'
  //   },
  // ];
}
