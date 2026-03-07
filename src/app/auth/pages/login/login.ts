import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  loading = signal<boolean>(false);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  errorMessage = '';
  

  onSubmit(): void {
    console.log('onSubmit');
    this.errorMessage = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, password } = this.form.getRawValue();
    if (!email || !password) return;
    this.loading.set(true);
    this.auth.login(email, password).subscribe({
      next: (res) => {
        console.log(res);
        
        this.loading.set(false); 
        if (res.must_change_password) {
          this.router.navigate(['/auth/change-password']);
        } else {
          this.router.navigate(['/admin']);
        }
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
        this.errorMessage = err?.error?.error ?? 'Credenciales inválidas.';
      },
    });
  }
}
