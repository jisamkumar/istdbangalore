import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface AuthResponse {
  message?: string;
  token?: string;
  accessToken?: string;
  data?: { token?: string; accessToken?: string };
  [key: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly sessionKey = 'istd-member-session';
  private readonly usernameKey = 'istd-member-username';
  private readonly fullNameKey = 'istd-member-full-name';
  private readonly mobileKey = 'istd-member-mobile';
  private readonly memberTypeKey = 'istd-member-type';
  private readonly apiURL = 'https://istdbangaloreweb.onrender.com/auth';

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem(this.sessionKey);
  }

  getUsername(): string {
    return sessionStorage.getItem(this.usernameKey) || '';
  }

  getFullName(): string {
    return sessionStorage.getItem(this.fullNameKey) || '';
  }

  getMobile(): string {
    return sessionStorage.getItem(this.mobileKey) || '';
  }

  getMemberType(): string {
    const saved = sessionStorage.getItem(this.memberTypeKey) || 'Candidate';
    const validTypes = ['Student', 'Professional', 'Individual', 'Institutional', 'Student Chapter', 'Candidate'];
    return validTypes.includes(saved) ? saved : 'Candidate';
  }

  storeMemberType(memberType: string): void {
    const value = memberType || 'Candidate';
    sessionStorage.setItem(this.memberTypeKey, value);
  }

  storeProfileBaseline(fullName: string, mobile: string): void {
    if (fullName) {
      sessionStorage.setItem(this.fullNameKey, fullName);
    }
    if (mobile) {
      sessionStorage.setItem(this.mobileKey, mobile);
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/login`, { username: email, password }).pipe(
      tap((response) => this.storeSession(response, email, response?.['memberType'] as string | undefined)),
    );
  }

  register(email: string, password: string, memberType: string = 'Candidate', fullName?: string, mobile?: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/register`, {
      username: email,
      password,
      memberType,
      fullName,
      mobile,
    }).pipe(
      tap(() => {
        this.storeMemberType(memberType);
        if (fullName) {
          this.storeProfileBaseline(fullName, mobile || '');
        }
      }),
    );
  }

  logout(): void {
    sessionStorage.removeItem(this.sessionKey);
    sessionStorage.removeItem(this.usernameKey);
    sessionStorage.removeItem(this.fullNameKey);
    sessionStorage.removeItem(this.mobileKey);
    sessionStorage.removeItem(this.memberTypeKey);
  }

  private storeSession(response: AuthResponse, email: string, memberType?: string): void {
    const token = response.token || response.accessToken || response.message || response.data?.token || response.data?.accessToken;
    sessionStorage.setItem(this.sessionKey, token || JSON.stringify(response));
    sessionStorage.setItem(this.usernameKey, email);
    if (memberType) {
      this.storeMemberType(memberType);
    }
  }
}
