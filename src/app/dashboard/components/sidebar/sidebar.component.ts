import { Component, inject, input, output, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

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

  readonly pages: PageItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: 'H',
      sections: [
        { label: 'Hero', route: '/home/hero' },
        { label: 'Beneficios', route: '/home/beneficios' },
        { label: 'Productos', route: '/home/products' },
        { label: 'Como funciona', route: '/home/como-funciona' },
        { label: 'Acerca de', route: '/home/acerca-de' },
        { label: 'Testimonios', route: '/home/testimonios' },
        { label: 'Contacto', route: '/home/contacto' },
      ],
    },
    {
      id: 'productos',
      label: 'Productos',
      icon: 'P',
      sections: [
        { label: 'introducción', route: '/productos/introducción' },
        { label: 'productos', route: '/productos/productos' },
      ],
    },
    {
      id: 'contacto',
      label: 'Contacto',
      icon: 'C',
      sections: [
        { label: 'información', route: '/contacto/información' },
        { label: 'formulario', route: '/contacto/formulario' },
      ],
    },
    {
      id: 'nosotros',
      label: 'Nosotros',
      icon: 'N',
      sections: [
        { label: 'introducción', route: '/nosotros/introducción' },
        { label: 'historia', route: '/nosotros/historia' },
        { label: 'visión', route: '/nosotros/visión' },
        { label: 'diferenciadores', route: '/nosotros/diferenciadores' },
        { label: 'equipo', route: '/nosotros/equipo' },
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
    return parts.length >= 1 ? '/' + parts[0] : '';
  }

  togglePage(pageId: string): void {
    this.openPageId.update((current) => (current === pageId ? null : pageId));
  }

  isPageOpen(pageId: string): boolean {
    return this.openPageId() === pageId;
  }
}