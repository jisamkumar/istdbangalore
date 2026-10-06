import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CONTACT } from '../../data/content';
import { AuthService } from '../../core/auth.service';

interface CheckboxOption {
  key: string;
  label: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  contact = CONTACT;
  form!: FormGroup;
  submitted = false;
  isEditing = false;
  isCreatingProfile = false;
  isViewingProfile = false;
  profile: any = null;
  profileLoaded = false;
  isProfileLoading = true;
  isLoading = false;
  errorMessage = '';
  profileLoadError = '';
  profileMemberType = 'Candidate';
  readonly memberTypeOptions = [
    { value: 'Student', label: 'Student' },
    { value: 'Professional', label: 'Professional' },
    { value: 'Individual', label: 'Individual' },
    { value: 'Institutional', label: 'Institutional' },
    { value: 'Student Chapter', label: 'Student Chapter' },
  ];
  private readonly profilesApiUrl = 'http://localhost:8088/api/profiles';
  private readonly profileStorageKey = 'istd-member-profile';
  private profileSnapshot: any = null;

  // ---- Option sets, mirroring the source ISTD BC Profile ----
  roleOptions: CheckboxOption[] = [
    { key: 'trainer', label: 'Trainer' },
    { key: 'assessor', label: 'Assessor' },
    { key: 'recruiter', label: 'Recruiter' },
    { key: 'industryExpert', label: 'Industry Expert' },
    { key: 'coordinator', label: 'Coordinator' },
    { key: 'volunteer', label: 'Volunteer' },
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
    { key: 'malayalam', label: 'Malayalam' },
    { key: 'telugu', label: 'Telugu' },
    { key: 'hindi', label: 'Hindi' },
    { key: 'other', label: 'Other' },
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
  selectedFiles: Record<string, File | null> = {};

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      personal: this.fb.group({
        membershipId: [''],
        fullName: ['', Validators.required],
        address: ['', Validators.required],
        email: [this.auth.getUsername(), [Validators.required, Validators.email]],
        mobile: ['', Validators.required],
        memberType: [this.auth.getMemberType() || 'Candidate', Validators.required],
        isStudent: ['', Validators.required],
      }),
      studentDetails: this.fb.group({
        institution: [''],
        studentId: [''],
        course: [''],
        yearOfStudy: [''],
      }),
      institutionDetails: this.fb.group({
        institutionName: [''],
        institutionType: [''],
        coordinatorName: [''],
        coordinatorRole: [''],
        campusLocation: [''],
        studentChapterObjective: [''],
      }),
      professional: this.fb.group({
        designation: ['', Validators.required],
        organization: ['', Validators.required],
        previousOrganizations: ['', Validators.required],
        totalExperience: ['', Validators.required],
        trainingExperience: ['', Validators.required],
      }),
      preferredRoles: this.fb.group({
        ...this.buildCheckboxGroup(this.roleOptions).controls,
        wouldLikeToVolunteer: [''],
      }),
      expertise: ['', Validators.required],
      deliveryMode: this.buildCheckboxGroup(this.deliveryModeOptions),
      languages: this.buildCheckboxGroup(this.languageOptions),
      otherLanguage: [''],
      preferredLocation: [''],

      representsCompany: ['', Validators.required],

      company: this.fb.group({
        name: [''],
        role: [''],
        address: [''],
        employees: [''],
        website: [''],

        natureOfBusiness: this.buildCheckboxGroup(this.natureOfBusinessOptions),
        otherBusiness: [''],

        servicesOffered: [''],

        interestedCollaborating: [''],

        collaborationArea: [''],

        canProvide: this.buildCheckboxGroup(this.canProvideOptions),
      }),

      majorClients: [''],

      uploads: this.fb.group({
        photo: [''],
        aadhaar: [''],
        pan: [''],
        resume: [''],
        studentResume: [''],
        certifications: [''],
        companyProfile: [''],
        studentIdProof: [''],
        institutionLetter: [''],
        chapterPlan: [''],
      }),

      declaration: [false, Validators.requiredTrue],
      signature: ['', Validators.required],
      date: ['', Validators.required],
    });

    // Company sub-fields only make sense once "Yes" is picked — keep them
    // optional in the model but visually required in the template.
    this.form.get('representsCompany')!.valueChanges.subscribe((val) => {
      const required = val === 'Yes' && this.showProfessionalFields;
      this.setRequiredValidator('company.name', required);
      this.setRequiredValidator('company.role', required);
      this.setRequiredValidator('company.interestedCollaborating', required);
    });

    this.form.get('personal.memberType')!.valueChanges.subscribe((val) => {
      const registeredMemberType = this.auth.getMemberType();
      const lockedType = registeredMemberType && registeredMemberType !== 'Candidate' ? registeredMemberType : null;
      if (lockedType && val !== lockedType) {
        this.form.get('personal.memberType')!.setValue(lockedType, { emitEvent: false });
        val = lockedType;
      }

      this.updateMemberTypeValidators(val || '');
    });

    this.form.get('personal.isStudent')!.valueChanges.subscribe((val) => {
      if (val === 'Yes' && this.form.get('personal.memberType')?.value !== 'Student') {
        this.form.get('personal.memberType')!.setValue('Student', { emitEvent: false });
      }
    });

    this.form.get('personal.memberType')!.setValue(this.auth.getMemberType());
    this.loadExistingProfile();
  }

  private updateMemberTypeValidators(memberType: string): void {
    const isStudent = memberType === 'Student';
    const isInstitution = memberType === 'Institutional' || memberType === 'Student Chapter';
    const isProfessional = memberType === 'Professional' || memberType === 'Individual';
    const requiresMembershipId = ['Individual', 'Institutional', 'Student Chapter'].includes(memberType);

    this.setRequiredValidator('personal.membershipId', requiresMembershipId);
    this.setRequiredValidator('personal.isStudent', false);
    this.form.get('personal.isStudent')!.setValue(isStudent ? 'Yes' : 'No', { emitEvent: false });

    const studentControls = ['institution', 'studentId', 'course', 'yearOfStudy'];
    studentControls.forEach((name) => this.setRequiredValidator(`studentDetails.${name}`, isStudent));

    const institutionControls = [
      'institutionName',
      'institutionType',
      'coordinatorName',
      'coordinatorRole',
      'campusLocation',
      'studentChapterObjective',
    ];
    institutionControls.forEach((name) => this.setRequiredValidator(`institutionDetails.${name}`, isInstitution));

    const professionalControls = [
      'designation',
      'organization',
      'previousOrganizations',
      'totalExperience',
      'trainingExperience',
    ];
    professionalControls.forEach((name) => this.setRequiredValidator(`professional.${name}`, isProfessional));
    this.setRequiredValidator('expertise', isProfessional);

    this.setRequiredValidator('preferredRoles.wouldLikeToVolunteer', isStudent);
    this.setRequiredValidator('representsCompany', isProfessional);
    this.setRequiredValidator('company.name', isProfessional && this.representsCompanyYes);
    this.setRequiredValidator('company.role', isProfessional && this.representsCompanyYes);
    this.setRequiredValidator('company.interestedCollaborating', isProfessional && this.representsCompanyYes);

    const requiredUploads = new Set(['photo', 'aadhaar']);
    if (isStudent) {
      requiredUploads.add('studentIdProof');
      requiredUploads.add('studentResume');
    } else {
      requiredUploads.add('pan');
    }
    if (isProfessional) requiredUploads.add('resume');
    if (isInstitution) requiredUploads.add('institutionLetter');
    if (memberType === 'Student Chapter') requiredUploads.add('chapterPlan');
    [
      'photo',
      'aadhaar',
      'pan',
      'resume',
      'studentResume',
      'studentIdProof',
      'institutionLetter',
      'chapterPlan',
    ].forEach((name) => this.setRequiredValidator(`uploads.${name}`, requiredUploads.has(name)));
  }

  private setRequiredValidator(controlPath: string, required: boolean): void {
    const control = this.form.get(controlPath)!;
    control.setValidators(required ? Validators.required : null);
    control.updateValueAndValidity({ emitEvent: false });
  }

  get selectedMemberType(): string {
    return this.form?.get('personal.memberType')?.value || this.auth.getMemberType() || 'Candidate';
  }

  get isMemberTypeLocked(): boolean {
    const registeredType = this.auth.getMemberType();
    return !!registeredType && registeredType !== 'Candidate';
  }

  get isStudent(): boolean {
    return this.selectedMemberType === 'Student' || this.form?.get('personal.isStudent')?.value === 'Yes';
  }

  get isInstitution(): boolean {
    return this.selectedMemberType === 'Institutional' || this.selectedMemberType === 'Student Chapter';
  }

  get showStudentFields(): boolean {
    return this.selectedMemberType === 'Student';
  }

  get showInstitutionalFields(): boolean {
    return this.selectedMemberType === 'Institutional' || this.selectedMemberType === 'Student Chapter';
  }

  get showProfessionalFields(): boolean {
    return ['Professional', 'Individual'].includes(this.selectedMemberType);
  }

  get showStudentUploadFields(): boolean {
    return this.showStudentFields;
  }

  get showInstitutionUploadFields(): boolean {
    return this.selectedMemberType === 'Institutional' || this.selectedMemberType === 'Student Chapter';
  }

  get showStudentChapterUploadFields(): boolean {
    return this.selectedMemberType === 'Student Chapter';
  }

  get showProfessionalUploadFields(): boolean {
    return this.showProfessionalFields;
  }

  get showPanUploadField(): boolean {
    return !this.showStudentFields;
  }

  get showStudentResumeUploadField(): boolean {
    return this.showStudentFields;
  }

  get profileTypeTitle(): string {
    switch (this.selectedMemberType) {
      case 'Student':
        return 'Student Profile';
      case 'Professional':
        return 'Professional Profile';
      case 'Individual':
        return 'Individual Profile';
      case 'Institutional':
        return 'Institutional Profile';
      case 'Student Chapter':
        return 'Student Chapter Profile';
      default:
        return 'Profile';
    }
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
    this.selectedFiles[controlPath] = file ?? null;
  }

  onSubmit() {
    if (!this.profileLoaded || this.isProfileLoading || (this.profile && !this.isEditing)) {
      return;
    }

    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.errorMessage = 'Please complete all mandatory (*) fields before saving your profile.';
      const firstInvalid = document.querySelector('.ng-invalid[formControlName], .ng-invalid input, .ng-invalid textarea');
      firstInvalid?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const profileId = this.profile?.id ?? this.profile?._id;
    if (this.profile && !profileId) {
      this.errorMessage = 'Unable to update your profile because its record id is missing.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    const formValue = this.form.getRawValue();
    const payload = this.toApiProfile(formValue);
    const hasUploadedFiles = Object.values(this.selectedFiles).some((file) => !!file);

    const request = hasUploadedFiles
      ? this.profile
        ? this.submitMultipartUpdate(profileId, payload)
        : this.submitMultipartCreate(payload)
      : this.profile
        ? this.http.put(`${this.profilesApiUrl}/${encodeURIComponent(String(profileId))}`, payload)
        : this.http.post(this.profilesApiUrl, payload);

    request.subscribe({
      next: (savedProfile: any) => {
        const responseProfile = savedProfile?.data ?? savedProfile;
        this.profile = responseProfile && typeof responseProfile === 'object'
          ? responseProfile
          : { ...this.profile, ...payload };
        this.storeProfileLocally(this.profile);
        this.populateForm(this.profile);
        this.selectedFiles = {};
        this.submitted = true;
        this.isEditing = false;
        this.isCreatingProfile = false;
        this.isViewingProfile = false;
        this.form.disable();
        this.profileSnapshot = this.form.getRawValue();
        this.isLoading = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error?.error?.message || 'Unable to submit your profile. Please try again.';
      },
    });
  }

  private submitMultipartCreate(payload: Record<string, unknown>) {
    const formData = this.buildMultipartFormData(payload);
    return this.http.post(this.profilesApiUrl + '/multipart', formData);
  }

  private submitMultipartUpdate(profileId: number | string | undefined, payload: Record<string, unknown>) {
    const formData = this.buildMultipartFormData(payload);
    return this.http.put(`${this.profilesApiUrl}/${encodeURIComponent(String(profileId))}/multipart`, formData);
  }

  private buildMultipartFormData(payload: Record<string, unknown>) {
    const formData = new FormData();
    formData.append('profile', new Blob([JSON.stringify(payload)], { type: 'application/json' }));

    const uploadFieldMap: Record<string, string> = {
      'uploads.photo': 'photo',
      'uploads.aadhaar': 'aadhaar',
      'uploads.pan': 'pan',
      'uploads.resume': 'resume',
      'uploads.studentResume': 'studentResume',
      'uploads.certifications': 'certifications',
      'uploads.companyProfile': 'companyProfile',
      'uploads.studentIdProof': 'studentIdProof',
      'uploads.institutionLetter': 'institutionLetter',
      'uploads.chapterPlan': 'chapterPlan',
    };

    Object.entries(this.selectedFiles).forEach(([controlPath, file]) => {
      if (file) {
        const backendName = uploadFieldMap[controlPath] || controlPath.replace('uploads.', '');
        formData.append(backendName, file, file.name);
      }
    });

    return formData;
  }

  private loadExistingProfile(): void {
    const email = this.auth.getUsername().trim().toLowerCase();
    if (!email) {
      this.isProfileLoading = false;
      this.profileLoadError = 'Unable to identify your account email. Please sign in again.';
      return;
    }

    const storedProfile = this.getStoredProfile(email);
    if (storedProfile) {
      this.setExistingProfile(storedProfile);
      this.profileLoaded = true;
      this.isProfileLoading = false;
      return;
    }

    this.profileLoaded = true;
    this.isProfileLoading = false;
    this.isCreatingProfile = true;
    this.form.enable();
    const savedFullName = this.auth.getFullName();
    const savedMobile = this.auth.getMobile();
    if (savedFullName || savedMobile) {
      this.form.patchValue({
        personal: {
          fullName: savedFullName || this.form.get('personal.fullName')?.value || '',
          mobile: savedMobile || this.form.get('personal.mobile')?.value || '',
        },
      });
    }

    this.http.get<any[]>(this.profilesApiUrl).subscribe({
      next: (response: any) => {
        const profiles = Array.isArray(response) ? response : response?.data || [response];
        const existingProfile = profiles.find((item: any) => item?.email?.trim().toLowerCase() === email);
        if (existingProfile) {
          this.setExistingProfile(existingProfile);
          this.storeProfileLocally(existingProfile);
        } else {
          this.isCreatingProfile = true;
          this.form.enable();
          this.profile = null;
        }
        this.profileLoaded = true;
        this.isProfileLoading = false;
      },
      error: () => {
        if (storedProfile) {
          return;
        }
        this.isCreatingProfile = true;
        this.form.enable();
        this.isProfileLoading = false;
        this.profileLoaded = true;
      },
    });
  }

  retryProfileLoad(): void {
    this.profileLoadError = '';
    this.isProfileLoading = true;
    this.loadExistingProfile();
  }

  editProfile(): void {
    if (!this.profile) {
      return;
    }

    this.profileSnapshot = this.form.getRawValue();
    this.isEditing = true;
    this.isCreatingProfile = false;
    this.isViewingProfile = false;
    this.submitted = false;
    this.form.enable();
    this.errorMessage = '';
  }

  createProfile(): void {
    this.isCreatingProfile = true;
    this.isEditing = false;
    this.isViewingProfile = false;
    this.submitted = false;
    this.form.enable();
    this.errorMessage = '';
  }

  viewProfile(): void {
    if (!this.profile) {
      return;
    }

    this.isEditing = false;
    this.isCreatingProfile = false;
    this.isViewingProfile = true;
    this.submitted = true;
    this.form.disable();
  }

  cancelEdit(): void {
    if (!this.profile || !this.profileSnapshot) {
      return;
    }

    this.form.reset(this.profileSnapshot);
    this.isEditing = false;
    this.isCreatingProfile = false;
    this.isViewingProfile = false;
    this.submitted = true;
    this.form.disable();
    this.errorMessage = '';
  }

  private setExistingProfile(profile: any): void {
    this.profile = profile;
    this.populateForm(profile);
    this.submitted = true;
    this.isCreatingProfile = false;
    this.isViewingProfile = false;
    this.form.disable();
    this.profileSnapshot = this.form.getRawValue();
  }

  private storeProfileLocally(profile: any): void {
    try {
      localStorage.setItem(this.profileStorageKey, JSON.stringify({
        accountEmail: this.auth.getUsername().trim().toLowerCase(),
        profile,
      }));
    } catch {
      // Local storage may be unavailable in privacy-restricted browsers.
    }
  }

  private getStoredProfile(email: string): any | null {
    try {
      const storedValue = JSON.parse(localStorage.getItem(this.profileStorageKey) || 'null');
      if (storedValue?.profile) {
        return storedValue.accountEmail === email ? storedValue.profile : null;
      }
      return storedValue?.email?.trim().toLowerCase() === email ? storedValue : null;
    } catch {
      return null;
    }
  }

  private toApiProfile(value: any): Record<string, unknown> {
    const company = value.company;
    const uploads = value.uploads;
    const { wouldLikeToVolunteer, ...preferredRoles } = value.preferredRoles;
    return {
      ...value.personal,
      memberType: value.personal.memberType || (value.personal.isStudent === 'Yes' ? 'Student' : 'Candidate'),
      ...value.studentDetails,
      ...value.institutionDetails,
      ...value.professional,
      expertise: value.expertise,
      deliveryMode: this.toStringMap(value.deliveryMode),
      languages: this.toStringMap(value.languages),
      otherLanguage: value.otherLanguage,
      preferredLocation: value.preferredLocation,
      preferredRoles: this.toStringMap(preferredRoles),
      wouldLikeToVolunteer,
      representsCompany: value.representsCompany,
      companyName: company.name,
      companyRole: company.role,
      companyAddress: company.address,
      employees: company.employees,
      companyWebsite: company.website,
      natureOfBusiness: this.toStringMap(company.natureOfBusiness),
      otherBusiness: company.otherBusiness,
      servicesOffered: company.servicesOffered,
      interestedCollaborating: company.interestedCollaborating,
      collaborationArea: company.collaborationArea,
      canProvide: this.toStringMap(company.canProvide),
      majorClients: value.majorClients,
      photoFileName: uploads.photo,
      aadhaarFileName: uploads.aadhaar,
      panFileName: uploads.pan,
      resumeFileName: uploads.resume,
      studentResumeFileName: uploads.studentResume,
      certificationsFileName: uploads.certifications,
      companyProfileFileName: uploads.companyProfile,
      studentIdProofFileName: uploads.studentIdProof,
      institutionLetterFileName: uploads.institutionLetter,
      chapterPlanFileName: uploads.chapterPlan,
      declaration: value.declaration,
      signature: value.signature,
      date: value.date,
    };
  }

  private populateForm(profile: any): void {
    const memberType = profile.memberType || (profile.isStudent === 'Yes' ? 'Student' : 'Candidate');
    this.profileMemberType = memberType;
    this.form.patchValue({
      personal: {
        membershipId: profile.membershipId ?? '',
        fullName: profile.fullName ?? '',
        address: profile.address ?? '',
        email: profile.email ?? '',
        mobile: profile.mobile ?? '',
        memberType,
        isStudent: profile.isStudent ?? (memberType === 'Student' ? 'Yes' : 'No'),
      },
      studentDetails: {
        institution: profile.institution ?? '',
        studentId: profile.studentId ?? '',
        course: profile.course ?? '',
        yearOfStudy: profile.yearOfStudy ?? '',
      },
      institutionDetails: {
        institutionName: profile.institutionName ?? '',
        institutionType: profile.institutionType ?? '',
        coordinatorName: profile.coordinatorName ?? '',
        coordinatorRole: profile.coordinatorRole ?? '',
        campusLocation: profile.campusLocation ?? '',
        studentChapterObjective: profile.studentChapterObjective ?? '',
      },
      professional: {
        designation: profile.designation ?? '',
        organization: profile.organization ?? '',
        previousOrganizations: profile.previousOrganizations ?? '',
        totalExperience: profile.totalExperience ?? '',
        trainingExperience: profile.trainingExperience ?? '',
      },
      preferredRoles: {
        ...this.toBooleanMap(profile.preferredRoles),
        wouldLikeToVolunteer: profile.wouldLikeToVolunteer ?? profile.preferredRoles?.wouldLikeToVolunteer ?? '',
      },
      expertise: profile.expertise ?? '',
      deliveryMode: this.toBooleanMap(profile.deliveryMode),
      languages: this.toBooleanMap(profile.languages),
      otherLanguage: profile.otherLanguage ?? '',
      preferredLocation: profile.preferredLocation ?? '',
      representsCompany: profile.representsCompany ?? '',
      company: {
        name: profile.companyName ?? '',
        role: profile.companyRole ?? '',
        address: profile.companyAddress ?? '',
        employees: profile.employees ?? '',
        website: profile.companyWebsite ?? '',
        natureOfBusiness: this.toBooleanMap(profile.natureOfBusiness),
        otherBusiness: profile.otherBusiness ?? '',
        servicesOffered: profile.servicesOffered ?? '',
        interestedCollaborating: profile.interestedCollaborating ?? '',
        collaborationArea: profile.collaborationArea ?? '',
        canProvide: this.toBooleanMap(profile.canProvide),
      },
      majorClients: profile.majorClients ?? '',
      uploads: {
        photo: profile.photoFileName ?? '',
        aadhaar: profile.aadhaarFileName ?? '',
        pan: profile.panFileName ?? '',
        resume: profile.resumeFileName ?? '',
        studentResume: profile.studentResumeFileName ?? '',
        certifications: profile.certificationsFileName ?? '',
        companyProfile: profile.companyProfileFileName ?? '',
        studentIdProof: profile.studentIdProofFileName ?? '',
        institutionLetter: profile.institutionLetterFileName ?? '',
        chapterPlan: profile.chapterPlanFileName ?? '',
      },
      declaration: profile.declaration ?? false,
      signature: profile.signature ?? '',
      date: profile.date ?? '',
    });
    this.fileNames = {
      'uploads.photo': profile.photoFileName ?? '',
      'uploads.aadhaar': profile.aadhaarFileName ?? '',
      'uploads.pan': profile.panFileName ?? '',
      'uploads.resume': profile.resumeFileName ?? '',
      'uploads.studentResume': profile.studentResumeFileName ?? '',
      'uploads.certifications': profile.certificationsFileName ?? '',
      'uploads.companyProfile': profile.companyProfileFileName ?? '',
      'uploads.studentIdProof': profile.studentIdProofFileName ?? '',
      'uploads.institutionLetter': profile.institutionLetterFileName ?? '',
      'uploads.chapterPlan': profile.chapterPlanFileName ?? '',
    };
  }

  private toStringMap(values: Record<string, unknown>): Record<string, string> {
    return Object.fromEntries(Object.entries(values).map(([key, value]) => [key, String(value)]));
  }

  private toBooleanMap(values: Record<string, unknown> = {}): Record<string, boolean> {
    return Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value === true || value === 'true']));
  }

  printForm() {
    window.print();
  }

}
