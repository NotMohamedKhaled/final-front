import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { ServiceService } from '../../../core/services/service.service';
import { IService } from '../../../core/interfaces/service.interface';

@Component({
  selector: 'app-services.admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './services.admin.html',
  styleUrl: './services.admin.css',
})
export class ServicesAdmin implements OnInit {
  services!: IService[];
  serviceForm!: FormGroup;

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.serviceForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      desc: new FormControl('', [Validators.required]),
      imgUrl: new FormControl('', [Validators.required]),
    });

    this.serviceService.getServicesByHttp().subscribe((data) => {
      this.services = data;
    });
  }

  editingIndex: number | null = null;

  addOrUpdate() {
    if (this.serviceForm.invalid) return;

    const serviceValues = this.serviceForm.value as IService;
    if (this.editingIndex !== null) {
      const current = this.services[this.editingIndex] as any;
      const id = current._id;

      this.serviceService.updateService(id, serviceValues).subscribe((updated) => {
        this.services[this.editingIndex!] = updated as IService;
        this.cancel();
      });
    } else {
      this.serviceService.addService(serviceValues).subscribe( (created) => {
          this.services = [...this.services, created as IService];
          this.serviceForm.reset();
        },
   );
    }
  }

  edit(index: number) {
    this.editingIndex = index;
    this.serviceForm.patchValue(this.services[index]);
  }
  cancel() {
    this.editingIndex = null;
    this.serviceForm.reset();
  }
  delete(index: number) {
    const current= this.services[index] as any;
    const id = current._id;
    this.serviceService.deleteService(id).subscribe( (data) => {
      this.services = this.services.filter((service, i) => i !== index)
    }); 
  }
}
