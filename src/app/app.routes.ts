import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CommitteeComponent } from './pages/committee/committee.component';
import { EventsComponent } from './pages/events/events.component';
import { MembershipComponent } from './pages/membership/membership.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ContactComponent } from './pages/contact/contact.component';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'ISTD Bangalore Chapter | Skill & Learning Development' },
  { path: 'about', component: AboutComponent, title: 'About | ISTD Bangalore Chapter' },
  { path: 'committee', component: CommitteeComponent, title: 'Committee | ISTD Bangalore Chapter' },
  { path: 'events', component: EventsComponent, title: 'Events & Programmes | ISTD Bangalore Chapter' },
  { path: 'membership', component: MembershipComponent, title: 'Membership | ISTD Bangalore Chapter' },
  { path: 'questionnaire', component: QuestionnaireComponent, title: 'Member Questionnaire | ISTD Bangalore Chapter' },
  { path: 'gallery', component: GalleryComponent, title: 'Gallery | ISTD Bangalore Chapter' },
  { path: 'contact', component: ContactComponent, title: 'Contact | ISTD Bangalore Chapter' },
  { path: '**', redirectTo: '' },
];
