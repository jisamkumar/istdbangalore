import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MEMBERSHIP, CONTACT } from '../../data/content';

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.scss',
})
export class MembershipComponent {
  tiers = MEMBERSHIP;
  contact = CONTACT;

  tierMeta = [
    { accent: 'red', icon: 'user' },
    { accent: 'teal', icon: 'building' },
    { accent: 'amber', icon: 'cap' },
  ];

  steps = [
    { title: 'Choose your pathway', text: 'Individual, institutional, or student — select the track that matches your role and development goals.' },
    { title: 'Share your experience', text: 'Complete the chapter application with your professional interests, capability needs, and organisation details.' },
    { title: 'Connect with the community', text: 'The chapter team helps identify relevant programmes, conversations, and collaboration opportunities.' },
    { title: 'Keep developing', text: 'Participate in chapter programmes, peer learning, Diploma and certificate opportunities, and professional forums.' },
  ];
}
