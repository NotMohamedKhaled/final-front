import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConatctService } from '../../../core/services/conatct.service';
import { IContact } from '../../../core/interfaces/contact.interface';

@Component({
  selector: 'app-contact.admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.admin.html',
  styleUrl: './contact.admin.css'
})
export class ContactAdmin implements OnInit {
  contacts!: IContact[];

  constructor(private contactService: ConatctService) {}

  ngOnInit(): void {
    this.contactService.getContact().subscribe((data) => {
      this.contacts = data;
    });
    }

  delete(index: number) {
    const current = this.contacts[index] as any;
    const id = current._id;
    this.contactService.deleteContact(id).subscribe(() =>{
      this.contacts = this.contacts.filter((contact, i) => i !== index)
    });
  }


}
