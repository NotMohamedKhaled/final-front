import { Component } from '@angular/core';
import { HomeAbout } from './home-about/home-about';
import { HomeHero } from './home-hero/home-hero';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HomeHero],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
