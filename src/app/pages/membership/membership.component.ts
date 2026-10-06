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
    { accent: 'teal', icon: 'user' },
    { accent: 'amber', icon: 'building' },
  ];

  steps = [
    { title: 'Choose your pathway', text: 'Individual, associate, or institutional — select the category that matches your role and development goals.' },
    { title: 'Share your experience', text: 'Complete the chapter application with your professional interests, capability needs, and organisation details.' },
    { title: 'Connect with the community', text: 'The chapter team helps identify relevant programmes, conversations, and collaboration opportunities.' },
    { title: 'Keep developing', text: 'Participate in chapter programmes, peer learning, Diploma and certificate opportunities, and professional forums.' },
  ];
}
