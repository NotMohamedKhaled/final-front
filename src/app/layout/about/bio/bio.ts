import { Component, Input } from '@angular/core';
import { IBio } from '../../../core/interfaces/aboutPage.interface';

@Component({
  selector: 'app-bio',
  imports: [],
  templateUrl: './bio.html',
  styleUrl: './bio.css'
})
export class Bio {
 @Input() bioData!:IBio;

}
