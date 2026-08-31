import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COMMITTEE } from '../../data/content';

@Component({
  selector: 'app-committee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './committee.component.html',
  styleUrl: './committee.component.scss',
})
export class CommitteeComponent {
  chairman = COMMITTEE[0];
  officeBearers = COMMITTEE.slice(1, 4);
  members = COMMITTEE.slice(4);

  accents = ['red', 'teal', 'violet', 'amber', 'sky', 'emerald'];

  accentFor(index: number): string {
    return this.accents[index % this.accents.length];
  }

  initials(name: string): string {
    return name
      .replace(/[\[\]]/g, '')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(w => w[0])
      .join('')
      .toUpperCase();
  }
}
