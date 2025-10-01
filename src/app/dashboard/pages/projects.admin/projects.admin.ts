import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { ProjectsService } from '../../../core/services/projects.service';
import { IProject } from '../../../core/interfaces/project.interface';

@Component({
  selector: 'app-projects.admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './projects.admin.html',
  styleUrl: './projects.admin.css',
})
export class ProjectsAdmin implements OnInit {
  projects: IProject[]=[];
  projectForm!: FormGroup;
  editingIndex: number | null = null;
  selectedFile: File | null = null;
  @ViewChild('projectFileInput') projectFileInput!: ElementRef<HTMLInputElement>;


  constructor(private projectsService: ProjectsService) {}
  ngOnInit(): void {
    this.projectForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      desc: new FormControl('', [Validators.required]),
      tech: new FormControl('', [Validators.required]),
      demoLink: new FormControl('', [Validators.required]),
      // imgUrl: new FormControl('', [Validators.required]),
    });

    this.projectsService.getProductsByHttp().subscribe((data) => {
      this.projects = data;
      console.log('Loaded projects:', data);

    });
  }

  addOrUpdate() {
    if (this.projectForm.invalid) return;

    const projectValues = this.projectForm.value as IProject;
    if (this.editingIndex !== null) {
      const current = this.projects[this.editingIndex] as any;
      const id = current._id;

      this.projectsService.updateProject(id, projectValues, this.selectedFile || undefined).subscribe((updated) => {
        this.projects = this.projects.map((proj, idx) => 
          idx === this.editingIndex ? updated : proj
        );
        this.cancel();
      });
    } else {
      this.projectsService.addProject(projectValues, this.selectedFile || undefined).subscribe((created) => {
        this.projects = [...this.projects, created as IProject];
        this.projectForm.reset();
        this.resetFileInput();
      });
    }
  }

  edit(index: number) {
    this.editingIndex = index;
    this.projectForm.patchValue(this.projects[index]);
  }
  cancel() {
    this.editingIndex = null;
    this.projectForm.reset();
    this.resetFileInput();
  }
  delete(index: number) {
    const current = this.projects[index] as any;
    const id = current._id;
    this.projectsService.deleteProject(id).subscribe(() =>{
      this.projects = this.projects.filter((proj, i) => i !== index)
    });
  }

  onImageSelected(event: Event){
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0){ this.selectedFile = null; return; }
    this.selectedFile = input.files[0];
    // input.value='';

  }
  resetFileInput() {
    this.selectedFile = null;
    if (this.projectFileInput) {
      this.projectFileInput.nativeElement.value = '';
    }
  }
}
