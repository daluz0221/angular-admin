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
  
    sidebarOpen = signal<boolean>(true);
    toggleSidebar(): void {
      this.sidebarOpen.update((open) => !open);
    }
}