import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./common/header/header";
import { Aboutus } from "./aboutus/aboutus";
import { Experience } from './experience/experience';

@Component({
  selector: 'app-root',
  imports: [Header, Aboutus,Experience,],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'rpsingh';
}
