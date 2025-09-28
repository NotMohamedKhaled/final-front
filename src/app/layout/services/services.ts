import { Component, OnInit } from '@angular/core';
import { Service } from './service/service';
import { ServiceService } from '../../core/services/service.service';
import { IService } from '../../core/interfaces/service.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  imports: [Service, RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class Services implements OnInit {

  services!:IService[];
  constructor(private servicesService:ServiceService){}
  ngOnInit(): void {
    this.servicesService.getServicesByHttp().subscribe(data=>{
      this.services=data;
      // console.log(this.services);
      
    })
  }

}
