import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet],
  templateUrl: './authLayout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayout { }
