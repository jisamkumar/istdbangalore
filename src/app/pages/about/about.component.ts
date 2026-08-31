import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ABOUT, SITE } from '../../data/content';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  about = ABOUT;
  site = SITE;

  affiliations = [
    { name: 'ISTD National', detail: 'Head office, New Delhi — apex body for all chapters', accent: 'red' },
    { name: 'IFTDO', detail: 'International Federation of Training & Development Organisations, Geneva', accent: 'teal' },
    { name: 'ARTDO', detail: 'Asian Regional Training & Development Organisation, Manila', accent: 'violet' },
    { name: 'DoPT', detail: 'Approved under the Faculty Development Scheme, Government of India', accent: 'amber' },
  ];

  pillarMeta = [
    { accent: 'red', icon: 'award' },
    { accent: 'teal', icon: 'users' },
    { accent: 'violet', icon: 'network' },
  ];
}
