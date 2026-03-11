import { Component, input, output, signal } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';


@Component({
    selector: 'app-layout',
    imports: [CommonModule, RouterOutlet, SidebarComponent],
    templateUrl: './layout.component.html',
  })
  export class LayoutComponent {
  /** En móvil arranca cerrado; en desktop (md+) arranca abierto. */
  sidebarOpen = signal<boolean>(false);

  constructor() {
    if (typeof window !== 'undefined') {
      this.sidebarOpen.set(window.matchMedia('(min-width: 768px)').matches);
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }
}