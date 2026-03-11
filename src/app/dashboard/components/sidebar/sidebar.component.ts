import { Component, computed, inject, input, output, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

export interface PageSection {
  label: string;
  route?: string;
}

export interface PageItem {
  id: string;
  label: string;
  icon: string;
  sections: PageSection[];
}

@Component({
  selector: 'app-sidebar',
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
})
export class SidebarComponent {
  protected readonly title = signal<string>('admin');
  sidebarOpen = input<boolean>(true);
  toggleSidebar = output<void>();

  /** Id de la página cuyo desplegable está abierto (null = ninguno) */
  openPageId = signal<string | null>(null);
  protected readonly router = inject(Router);
  protected readonly authService = inject(AuthService);

  user = computed(() => this.authService.user() ?? null);

  readonly pages: PageItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: 'H',
      sections: [
        { label: 'Hero', route: '/admin/home/hero' },
        { label: 'Beneficios', route: '/admin/home/beneficios' },
        { label: 'Productos', route: '/admin/home/products' },
        { label: 'Como funciona', route: '/admin/home/como-funciona' },
        { label: 'Acerca de', route: '/admin/home/acerca-de' },
        { label: 'Testimonios', route: '/admin/home/testimonios' },
        { label: 'Contacto', route: '/admin/home/contacto' },
      ],
    },
    {
      id: 'productos',
      label: 'Productos',
      icon: 'P',
      sections: [
        { label: 'introducción', route: '/admin/productos/introducción' },
        { label: 'productos', route: '/admin/productos/productos' },
      ],
    },
    {
      id: 'contacto',
      label: 'Contacto',
      icon: 'C',
      sections: [
        { label: 'información', route: '/admin/contacto/información' },
        { label: 'formulario', route: '/admin/contacto/formulario' },
      ],
    },
    {
      id: 'nosotros',
      label: 'Nosotros',
      icon: 'N',
      sections: [
        { label: 'introducción', route: '/admin/nosotros/introducción' },
        { label: 'historia', route: '/admin/nosotros/historia' },
        { label: 'visión', route: '/admin/nosotros/visión' },
        { label: 'diferenciadores', route: '/admin/nosotros/diferenciadores' },
        { label: 'equipo', route: '/admin/nosotros/equipo' },
      ],
    },
  ];

  isPageActive(page: PageItem): boolean {
    const basePath = this.getPageBasePath(page);
    return this.router.url.startsWith(basePath);
  }
  private getPageBasePath(page: PageItem): string {
    const firstRoute = page.sections[0]?.route;
    
    if (!firstRoute) return '';
    const parts = firstRoute.split('/').filter(Boolean);
    return parts.length >= 1 ? '/' + parts[0] + '/' + parts[1] : '';
  }

  togglePage(pageId: string): void {
    this.openPageId.update((current) => (current === pageId ? null : pageId));
  }

  isPageOpen(pageId: string): boolean {
    return this.openPageId() === pageId;
  }
}