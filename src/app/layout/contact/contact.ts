import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { digitsOnlyValidator } from '../../core/validators/phone.validator';
import { ConatctService } from '../../core/services/conatct.service';
import { IContact } from '../../core/interfaces/contact.interface';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements OnInit{
	form!: FormGroup;
	submitted = false;
	submitting = false;
	submitError: string | null = null;

	constructor(private contactService:ConatctService){}

  ngOnInit(): void {
		this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
			email: new FormControl('', [Validators.required, Validators.email]),
			phone: new FormControl('', [Validators.required, digitsOnlyValidator()]),
			enquire: new FormControl('', [Validators.required, Validators.minLength(10)])
    })
  }

	get f(){ return this.form.controls; }

	onSubmit(){
		this.submitted = true;
		this.submitError = null;
		if (this.form.invalid) { return; }
		this.submitting = true;
		this.contactService.sendContact(this.form.value as IContact).subscribe({
			next: () => {
				this.submitting = false;
				this.form.reset();
				this.submitted = false;
			},
			error: (err) => {
				this.submitting = false;
				this.submitError = 'Failed to send your enquiry. Please try again.';
				console.error(err);
			}
		});
  }

}