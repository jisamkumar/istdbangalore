import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SITE, ABOUT, EVENTS } from '../../data/content';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  site = SITE;
  about = ABOUT;
  upcomingEvents = EVENTS.filter(e => e.status === 'Upcoming').slice(0, 3);

  // ---- Hero carousel ----
  slideIndex = 0;
  private timer?: ReturnType<typeof setInterval>;
  private readonly intervalMs = 5000;

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  startAutoplay(): void {
    this.stopAutoplay();
    if (this.upcomingEvents.length > 1) {
      this.timer = setInterval(() => this.next(), this.intervalMs);
    }
  }

  stopAutoplay(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  next(): void {
    this.slideIndex = (this.slideIndex + 1) % this.upcomingEvents.length;
  }

  prev(): void {
    this.slideIndex =
      (this.slideIndex - 1 + this.upcomingEvents.length) % this.upcomingEvents.length;
  }

  goTo(i: number): void {
    this.slideIndex = i;
    this.startAutoplay();
  }

  stats = [
    { value: '55+', label: 'Years as a Chapter of ISTD', accent: 'red' },
    { value: '1,000+', label: 'PG Diploma Graduates Trained', accent: 'teal' },
    { value: '24', label: 'Successful Skill Training/Assessments', accent: 'violet' },
    { value: '3', label: 'Membership Options: Individual, Institutional, and Student', accent: 'amber' },
  ];

  pillarMeta = [
    { accent: 'red', icon: 'award' },
    { accent: 'teal', icon: 'users' },
    { accent: 'violet', icon: 'network' },
  ];
}
