import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EVENTS } from '../../data/content';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent {
  filter: 'All' | 'Upcoming' | 'Past' = 'Upcoming';
  events = EVENTS;

  get filtered() {
    if (this.filter === 'All') return this.events;
    return this.events.filter(e => e.status === this.filter);
  }

  setFilter(f: 'All' | 'Upcoming' | 'Past') {
    this.filter = f;
  }
}
