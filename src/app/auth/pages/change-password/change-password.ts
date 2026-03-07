import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePassword {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private router = inject(Router);
  loading = signal<boolean>(false);

  private authApiUrl = environment.authApiUrl;

  form = this.fb.group({
    new_password: ['', [Validators.required, Validators.minLength(8)]],
    confirm_password: ['', [Validators.required]],
  });

  errorMessage = '';
  successMessage = '';
  

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    const { new_password, confirm_password } = this.form.value;
    if (new_password !== confirm_password) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }
    if (this.form.invalid || !new_password) {
      this.form.markAllAsTouched();
      return;
    }
    const token = this.auth.accessToken();
    if (!token) {
      this.errorMessage = 'Sesión no válida. Inicia sesión de nuevo.';
      return;
    }
    this.loading.set(true);
    this.http
      .post(
        `${this.authApiUrl}me/change-password`,
        { new_password: new_password },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      )
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.successMessage = 'Contraseña actualizada. Redirigiendo…';
          this.auth.loadCurrentUser().subscribe();
          setTimeout(() => this.router.navigate(['/admin']), 1500);
        },
        error: (err) => {
          this.loading.set(false);
          this.errorMessage = err?.error?.error ?? 'No se pudo actualizar la contraseña.';
        },
      });
  }
}
