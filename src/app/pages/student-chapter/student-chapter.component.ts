import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SITE } from '../../data/content';

@Component({
  selector: 'app-student-chapter',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-chapter.component.html',
  styleUrl: './student-chapter.component.scss',
})
export class StudentChapterComponent {
  site = SITE;

  about = {
    intro: 'An ISTD Student Chapter connects your institution to a national professional body and gives students a practical, visible pathway into training, HR, learning and development.',
    mission: 'An institutional chapter gives faculty, employers, and student leaders a shared platform for applied learning, professional exchange, and sustained capability building.',
  };

  stats = [
    { value: '01', label: 'Institutional partner' },
    { value: '04', label: 'Ways to engage' },
    { value: '∞', label: 'Paths to keep learning' },
  ];

  institutionBenefits = [
    { title: 'A visible professional link', text: 'Connect your Campus to ISTD Bangalore and the wide training and development ecosystem.' },
    { title: 'Applied learning culture', text: 'Give Students a regular setting for workshops, practitioner conversations, projects, and presentations.' },
    { title: 'Faculty and industry exchange', text: 'Create a bridge for faculty, employers, trainers, and learners to work on relevant capability needs.' },
    { title: 'A durable Student platform', text: 'Build continuity through Student leadership, chapter activities, and a community that grows each year.' },
  ];

  benefits = [
    { title: 'Practitioner access', text: 'Meet working professionals in HR, L&D, training, and capability building.' },
    { title: 'Workshops and forums', text: 'Take part in webinars, panel conversations, and hands-on learning sessions.' },
    { title: 'Mentorship and guidance', text: 'Explore career directions with people who understand the learning profession.' },
    { title: 'Student showcases', text: 'Present research, projects, and ideas at chapter and regional platforms.' },
    { title: 'Peer network', text: 'Build relationships with students and emerging practitioners across the community.' },
    { title: 'Continuing resources', text: 'Stay connected to ISTD programmes, publications, and learning opportunities.' },
  ];

  requirements = [
    'Enrolled in a degree programme in HR, L&D, Training, Education, Management, or related field',
    'Interest in learning and development, capability building, or workplace training',
    'Commitment to participate in at least one chapter activity per quarter',
    'Valid student ID and institutional confirmation',
  ];

  joinProcess = [
    { step: '01', title: 'Open the conversation', text: 'A faculty coordinator or institutional representative shares the intent to build a chapter.' },
    { step: '02', title: 'Shape the partnership', text: 'Align on the institution, student cohort, focus areas, and the first activity.' },
    { step: '03', title: 'Form the student team', text: 'Bring together motivated students to lead communication, programmes, and participation.' },
    { step: '04', title: 'Start the rhythm', text: 'Launch the first session and build a consistent calendar of learning and exchange.' },
  ];
}
