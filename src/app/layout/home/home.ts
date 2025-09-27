import { Component } from '@angular/core';
import { HomeAbout } from './home-about/home-about';
import { HomeHero } from './home-hero/home-hero';

@Component({
  selector: 'app-home',
  imports: [HomeAbout,HomeHero],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
