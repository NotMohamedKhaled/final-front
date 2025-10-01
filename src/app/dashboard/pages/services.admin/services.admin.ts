import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  selectedServiceFile: File | null = null;
  
  @ViewChild('serviceFileInput') serviceFileInput!: ElementRef<HTMLInputElement>;


  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.serviceForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      desc: new FormControl('', [Validators.required]),
      // imgUrl: new FormControl('', [Validators.required]),
    });

    this.serviceService.getServicesByHttp().subscribe((data) => {
      this.services = data;
      console.log('Loaded projects:', data);

    });
  }

  editingIndex: number | null = null;

  addOrUpdate() {
    if (this.serviceForm.invalid) return;

    const serviceValues = this.serviceForm.value as IService;
    if (this.editingIndex !== null) {
      const current = this.services[this.editingIndex] as any;
      const id = current._id;
      // For services, assuming backend accepts JSON with imgUrl string. If you want multer here too,
      // you need an upload endpoint. For now we keep JSON update.
      this.serviceService.updateService(id, serviceValues,this.selectedServiceFile||undefined).subscribe((updated) => {
        this.services = this.services.map((service, idx) => 
          idx === this.editingIndex ? updated as IService : service
        );
        this.cancel();
      });
    } else {
      this.serviceService.addService(serviceValues ,this.selectedServiceFile||undefined).subscribe( (created) => {
          this.services = [...this.services, created as IService];
          this.serviceForm.reset();
          this.resetFileInput();
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
    this.resetFileInput();
  }
  delete(index: number) {
    const current= this.services[index] as any;
    const id = current._id;
    this.serviceService.deleteService(id).subscribe( (data) => {
      this.services = this.services.filter((service, i) => i !== index)
    }); 
  }

  onServiceImageSelected(event: Event){
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0){ this.selectedServiceFile = null; return; }
    this.selectedServiceFile = input.files[0];
      //  input.value = '';

  }
  resetFileInput() {
    this.selectedServiceFile = null;
    if (this.serviceFileInput) {
      this.serviceFileInput.nativeElement.value = '';
    }
  }
}
