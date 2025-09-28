import { Component } from '@angular/core';
import { IAboutPage } from '../../core/interfaces/aboutPage.interface';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
aboutPageData!:IAboutPage;


}
