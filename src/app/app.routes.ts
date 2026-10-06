import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CommitteeComponent } from './pages/committee/committee.component';
import { EventsComponent } from './pages/events/events.component';
import { MembershipComponent } from './pages/membership/membership.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { StudentChapterComponent } from './pages/student-chapter/student-chapter.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'ISTD Bangalore Chapter | Training ' },
  { path: 'about', component: AboutComponent, title: 'About | ISTD Bangalore Chapter' },
  { path: 'committee', component: CommitteeComponent, title: 'Committee | ISTD Bangalore Chapter' },
  { path: 'events', component: EventsComponent, title: 'Events & Programmes | ISTD Bangalore Chapter' },
  { path: 'membership', component: MembershipComponent, title: 'Membership | ISTD Bangalore Chapter' },
  { path: 'student-chapter', component: StudentChapterComponent, title: 'Student Chapter | ISTD Bangalore Chapter' },
  { path: 'login', component: LoginComponent, title: 'Member Login | ISTD Bangalore Chapter' },
  { path: 'register', component: RegisterComponent, title: 'Register | ISTD Bangalore Chapter' },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard], title: 'Profile | ISTD Bangalore Chapter' },
  { path: 'gallery', component: GalleryComponent, title: 'Gallery | ISTD Bangalore Chapter' },
  { path: 'contact', component: ContactComponent, title: 'Contact | ISTD Bangalore Chapter' },
  { path: '**', redirectTo: '' },
];
