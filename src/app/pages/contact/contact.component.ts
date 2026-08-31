import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CONTACT } from '../../data/content';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  contact = CONTACT;
  submitted = false;
  mapUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.contact.mapEmbedUrl);
  }

  model = {
    name: '',
    email: '',
    subject: 'Membership enquiry',
    message: '',
  };

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    // ⚠ PLACEHOLDER — this demo submission just confirms in-page.
    // Wire this up to a real backend/email service (e.g. Formspree,
    // a serverless function, or the chapter's mail server) to actually
    // deliver messages.
    this.submitted = true;
    form.resetForm({ subject: 'Membership enquiry' });
  }
}
