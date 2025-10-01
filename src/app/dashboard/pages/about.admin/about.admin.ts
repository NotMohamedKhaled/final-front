import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { AboutService } from '../../../core/services/about.service';
import { UploadService } from '../../../core/services/upload.service';
import { IAboutPage, IBio, IEducation, ISkill } from '../../../core/interfaces/aboutPage.interface';

@Component({
  selector: 'app-about.admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './about.admin.html',
  styleUrl: './about.admin.css',
})
export class AboutAdmin implements OnInit {
  constructor(private aboutService: AboutService, private uploadService: UploadService) {}

  aboutData!: IAboutPage;
  bioForm!: FormGroup;
  educationForm!: FormGroup;
  skillForm!: FormGroup;
  file!:File;
  selectedFile:File|null=null;
  ngOnInit(): void {
    this.bioForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      paragraph: new FormControl('', [Validators.required]),
      // imgUrl: new FormControl('', [Validators.required]),
    });

    this.educationForm = new FormGroup({
      _id: new FormControl(''), // Add this
      school: new FormControl('', [Validators.required]),
      degree: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      paragraph: new FormControl('', [Validators.required]),
    });

    this.skillForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      level: new FormControl('', [Validators.required]),
      // iconUrl: new FormControl('', [Validators.required]),
    });

    this.aboutService.getAboutData().subscribe((data) => {
      this.aboutData = data;
    });
  }

  // loading = true;
  // error: string | null = null;

  editingEducationIndex: number | null = null;
  editingSkillIndex: number | null = null;

  // constructor(private fb: FormBuilder, private aboutService: AboutService){
  //   this.bioForm = this.fb.group({
  //     title: ['', [Validators.required, Validators.maxLength(120)]],
  //     paragraph: ['', [Validators.required]],
  //     imgUrl: ['']
  //   });

  //   this.educationForm = this.fb.group({
  //     school: ['', Validators.required],
  //     degree: ['', Validators.required],
  //     year: ['', Validators.required],
  //     location: ['', Validators.required],
  //     paragraph: ['']
  //   });

  //   this.skillForm = this.fb.group({
  //     name: ['', Validators.required],
  //     level: ['', Validators.required],
  //     iconUrl: ['', Validators.required]
  //   });

  //   this.load();
  // }

  // load(){
  //   this.loading = true;
  //   this.aboutService.getAboutData().subscribe({
  //     next: (data) => {
  //       this.aboutData = data;
  //       if (data?.bio) this.bioForm.patchValue(data.bio as IBio);
  //       this.loading = false;
  //     },
  //     error: (err) => { this.error = 'Failed to load about dataa'; this.loading = false; console.error(err); }
  //   });
  // }

  // // Bio
  saveBio() {
    console.log(this.bioForm);

    if (this.bioForm.invalid) return;
    const bio = this.bioForm.value as IBio;
    this.aboutService.updateBio(bio,this.file||undefined).subscribe((saved) => {
      if (this.aboutData) this.aboutData.bio = saved as IBio;
    });
  }

  onBioImageSelected(event: Event){
    const input = event.target as HTMLInputElement;
    if(!input.files || input.files.length === 0) return;
    this.file = input.files[0];
    
  }

  // // Education
  addOrUpdateEducation() {
    console.log(this.educationForm);

    if (this.educationForm.invalid) return;

    const eduValues = this.educationForm?.value as IEducation;
    const eduArray = this.aboutData?.education;

    //editing
    if (this.editingEducationIndex !== null && this.aboutData) {
      const current = eduArray[this.editingEducationIndex];
      // const id = current?._id || current?.id || `${this.editingEducationIndex}`;
      const id = current?._id;

      this.aboutService.updateEducation(id, eduValues).subscribe((updated) => {
        this.aboutData.education[this.editingEducationIndex!] = updated as IEducation;
        this.cancelEditEducation();
      });

      //adding
    } else {
      this.aboutService.addEducation(eduValues).subscribe((created) => {
        if (!this.aboutData) return;
        this.aboutData.education = [...eduArray, created];
        this.educationForm.reset();
      });
    }
  }

  //edit from the edu list
  editEducation(index: number) {
    if (!this.aboutData) return;
    this.editingEducationIndex = index;
    const edu = this.aboutData.education[index];
    // Only patch the fields that exist in the form
    this.educationForm.patchValue({
      _id:edu._id,
      school: edu.school,
      degree: edu.degree,
      year: edu.year,
      location: edu.location,
      paragraph: edu.paragraph
    });
  }
  cancelEditEducation() {
    this.editingEducationIndex = null;
    this.educationForm.reset();
  }

  //deleting
  deleteEducation(index: number) {
    if (!this.aboutData) return;

    const current = this.aboutData.education[index] as any;
    const id = current._id;
    this.aboutService.deleteEducation(id).subscribe((data) => {
      this.aboutData!.education = this.aboutData!.education.filter((item, i) => i !== index);
    });
  }

  // // Skills

  addOrUpdateSkill() {
    if (this.skillForm.invalid) return;
  
    const skillValues = this.skillForm.value as ISkill;
    const skillArr = this.aboutData.skills;
  
    if (this.editingSkillIndex !== null && this.aboutData) {
      const current = skillArr[this.editingSkillIndex];
      const id = current._id;
  
      this.aboutService.updateSkill(id, skillValues, this.selectedFile|| undefined).subscribe((updated) => {
        this.aboutData.skills[this.editingSkillIndex!] = updated as ISkill;
        this.cancelEditSkill();
      });
    } else {
      console.log(this.file)
      this.aboutService.addSkill(skillValues, this.selectedFile || undefined).subscribe((created) => {
        if (!this.aboutData) return;
        this.aboutData.skills = [...skillArr, created as ISkill];
        this.skillForm.reset();
      });
    }
  }

  editSkill(index: number) {
    if (!this.aboutData) return;
    this.editingSkillIndex = index;
    const skill = this.aboutData.skills[index];
    this.skillForm.patchValue({
      _id: skill._id,
      name: skill.name,
      level: skill.level,
      
    });
  }
  
  cancelEditSkill() {
    this.editingSkillIndex = null;
    this.skillForm.reset();
  }
  
  deleteSkill(index: number) {
    if (!this.aboutData) return;
    const current = this.aboutData.skills[index];
    const id = current._id;
  
    this.aboutService.deleteSkill(id).subscribe(() => {
      this.aboutData!.skills = this.aboutData!.skills.filter((s, i) => i !== index);
    });
  }
  

  onSkillIconSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0){ this.selectedFile = null; return; }
    this.selectedFile = input.files[0];
    }
  }

//   editSkill(index: number) {
//     if (!this.aboutData) return;
//     this.editingSkillIndex = index;
//     this.skillForm.patchValue(this.aboutData.skills[index]);
//   }
//   cancelEditSkill() {
//     this.editingSkillIndex = null;
//     this.skillForm.reset();
//   }
//   deleteSkill(index: number) {
//     if (!this.aboutData) return;
//     const current: any = this.aboutData.skills[index] as any;
//     const id = current._id;
//     this.aboutService.deleteSkill(id).subscribe((data) => {
//       this.aboutData!.skills = this.aboutData!.skills.filter((skill, i) => i !== index);
//     });
//   }

