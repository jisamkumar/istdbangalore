import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CONTACT } from '../../data/content';

interface CheckboxOption {
  key: string;
  label: string;
}

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.scss',
})
export class QuestionnaireComponent implements OnInit {
  contact = CONTACT;
  form!: FormGroup;
  submitted = false;

  // ---- Option sets, mirroring the source ISTD BC Member Questionnaire ----
  roleOptions: CheckboxOption[] = [
    { key: 'trainer', label: 'Trainer' },
    { key: 'assessor', label: 'Assessor' },
    { key: 'recruiter', label: 'Recruiter' },
    { key: 'industryExpert', label: 'Industry Expert' },
    { key: 'coordinator', label: 'Coordinator' },
    { key: 'consultant', label: 'Consultant' },
  ];

  deliveryModeOptions: CheckboxOption[] = [
    { key: 'classroom', label: 'Classroom' },
    { key: 'online', label: 'Online' },
    { key: 'hybrid', label: 'Hybrid' },
  ];

  languageOptions: CheckboxOption[] = [
    { key: 'english', label: 'English' },
    { key: 'kannada', label: 'Kannada' },
    { key: 'tamil', label: 'Tamil' },
    { key: 'telugu', label: 'Telugu' },
    { key: 'malayalam', label: 'Malayalam' },
    { key: 'other', label: 'Other' },
  ];

  locationOptions: CheckboxOption[] = [
    { key: 'bengaluru', label: 'Bengaluru' },
    { key: 'india', label: 'India' },
    { key: 'international', label: 'International' },
  ];

  natureOfBusinessOptions: CheckboxOption[] = [
    { key: 'educationalInstitution', label: 'Educational Institution' },
    { key: 'corporateTrainingCompany', label: 'Corporate Training Company' },
    { key: 'hrConsultancy', label: 'HR Consultancy' },
    { key: 'skillTrainingInstitute', label: 'Skill Training Institute' },
    { key: 'assessmentAgency', label: 'Assessment Agency' },
    { key: 'recruitmentAgency', label: 'Recruitment Agency' },
    { key: 'itCompany', label: 'IT Company' },
    { key: 'manufacturing', label: 'Manufacturing' },
    { key: 'societyNgoTrust', label: 'Society / NGO / Trust' },
    { key: 'startup', label: 'Startup' },
    { key: 'consultancy', label: 'Consultancy' },
    { key: 'other', label: 'Other' },
  ];

  canProvideOptions: CheckboxOption[] = [
    { key: 'trainers', label: 'Trainers' },
    { key: 'assessors', label: 'Assessors' },
    { key: 'interviewPanelMembers', label: 'Interview Panel Members' },
    { key: 'internshipOpportunities', label: 'Internship Opportunities' },
    { key: 'jobOpportunities', label: 'Job Opportunities' },
    { key: 'corporateTrainingProjects', label: 'Corporate Training Projects' },
    { key: 'industrialVisits', label: 'Industrial Visits' },
    { key: 'mentors', label: 'Mentors' },
    { key: 'subjectMatterExperts', label: 'Subject Matter Experts' },
  ];

  fileNames: Record<string, string> = {};

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      personal: this.fb.group({
        membershipId: ['', Validators.required],
        fullName: ['', Validators.required],
        address: [''],
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', Validators.required],
      }),
      professional: this.fb.group({
        designation: ['', Validators.required],
        organization: ['', Validators.required],
        previousOrganizations: ['', Validators.required],
        totalExperience: ['', Validators.required],
        trainingExperience: ['', Validators.required],
      }),
      preferredRoles: this.buildCheckboxGroup(this.roleOptions),
      expertise: ['', Validators.required],
      deliveryMode: this.buildCheckboxGroup(this.deliveryModeOptions),
      languages: this.buildCheckboxGroup(this.languageOptions),
      otherLanguage: [''],
      preferredLocation: this.buildCheckboxGroup(this.locationOptions),

      representsCompany: ['', Validators.required], // Yes / No / Previously
      company: this.fb.group({
        name: [''],
        role: [''],
        address: [''],
        employees: [''],
        website: [''],
      }),
      natureOfBusiness: this.buildCheckboxGroup(this.natureOfBusinessOptions),
      otherBusiness: [''],
      servicesOffered: [''],
      interestedCollaborating: [''], // Yes / No / Later
      collaborationArea: [''],
      canProvide: this.buildCheckboxGroup(this.canProvideOptions),

      majorClients: [''],

      uploads: this.fb.group({
        photo: [''],
        resume: [''],
        certifications: [''],
        companyProfile: [''],
      }),

      declaration: [false, Validators.requiredTrue],
      signature: ['', Validators.required],
      date: ['', Validators.required],
    });

    // Company sub-fields only make sense once "Yes" is picked — keep them
    // optional in the model but visually required in the template.
    this.form.get('representsCompany')!.valueChanges.subscribe((val) => {
      const companyGroup = this.form.get('company')!;
      if (val === 'Yes') {
        companyGroup.get('name')!.setValidators(Validators.required);
        companyGroup.get('role')!.setValidators(Validators.required);
      } else {
        companyGroup.get('name')!.clearValidators();
        companyGroup.get('role')!.clearValidators();
      }
      companyGroup.get('name')!.updateValueAndValidity();
      companyGroup.get('role')!.updateValueAndValidity();
    });
  }

  private buildCheckboxGroup(options: CheckboxOption[]): FormGroup {
    const group: Record<string, any> = {};
    options.forEach((o) => (group[o.key] = [false]));
    return this.fb.group(group);
  }

  get representsCompanyYes(): boolean {
    return this.form?.get('representsCompany')?.value === 'Yes';
  }

  onFileSelected(event: Event, controlPath: string) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];
    const name = file ? file.name : '';
    this.form.get(controlPath)!.setValue(name);
    this.fileNames[controlPath] = name;
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      const firstInvalid = document.querySelector('.ng-invalid[formControlName], .ng-invalid input, .ng-invalid textarea');
      firstInvalid?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    // ⚠ DEMO ONLY — this does not send data anywhere yet. Wire this up to
    // a real backend / form service (Formspree, a serverless function, or
    // the chapter office's mail server) before going live.
    this.submitted = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  printForm() {
    window.print();
  }

  startNewResponse() {
    this.submitted = false;
    this.form.reset();
    const checkboxGroups = ['preferredRoles', 'deliveryMode', 'languages', 'preferredLocation', 'natureOfBusiness', 'canProvide'];
    checkboxGroups.forEach((groupKey) => {
      const group = this.form.get(groupKey) as FormGroup;
      Object.keys(group.controls).forEach((ck) => group.get(ck)?.setValue(false, { emitEvent: false }));
    });
    this.fileNames = {};
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
