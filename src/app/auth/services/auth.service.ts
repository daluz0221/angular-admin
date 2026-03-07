import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/User.interface';
import type { LoginResponse } from '../interfaces/User.interface';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authApiUrl = environment.authApiUrl;
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _accessToken = signal<string | null>(null);

  readonly authStatus = this._authStatus.asReadonly();
  readonly user = this._user.asReadonly();
  readonly accessToken = this._accessToken.asReadonly();
  readonly isAuthenticated = computed(() => this._authStatus() === 'authenticated');

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.authApiUrl}login`, { email, password }, {
        withCredentials: true,
      })
      .pipe(
        tap((res) => {
          console.log(res);
          this._accessToken.set(res.access);
          this._authStatus.set('authenticated');
          this.loadCurrentUser().subscribe();
        }),
      );
  }

  /** Obtiene el usuario actual (GET /me). Requiere access token en memoria o header. */
  loadCurrentUser(): Observable<User> {
    const token = this._accessToken();
    if (!token) {
      return of(null as unknown as User);
    }
    return this.http
      .get<User>(`${this.authApiUrl}me`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .pipe(
        
        tap((u) => this._user.set(u)),
        catchError(() => {
          this._user.set(null);
          return of(null as unknown as User);
        }),
      );
  }

  /** Renueva el access token usando la cookie HttpOnly de refresh. */
  refreshAccessToken(): Observable<{ access: string }> {
    return this.http
      .post<{ access: string }>(`${this.authApiUrl}token/refresh`, {}, {
        withCredentials: true,
      })
      .pipe(
        tap((res) => this._accessToken.set(res.access)),
      );
  }

  logout(): void {
    this._accessToken.set(null);
    this._user.set(null);
    this._authStatus.set('not-authenticated');
    this.router.navigate(['/login']);
  }

  setAccessToken(token: string | null): void {
    this._accessToken.set(token);
  }
}
