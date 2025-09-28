import { Component, Input } from '@angular/core';
import { IService } from '../../../core/interfaces/service.interface';

@Component({
  selector: 'app-service',
  imports: [],
  templateUrl: './service.html',
  styleUrl: './service.css'
})
export class Service {
  @Input() myService!:IService;

}
