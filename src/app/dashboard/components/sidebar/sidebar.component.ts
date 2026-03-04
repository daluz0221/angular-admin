import { Component, input, output, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

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

  readonly pages: PageItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: 'H',
      sections: [
        { label: 'Hero', route: '/home/hero' },
        { label: 'Beneficios', route: '/home/benefits' },
        { label: 'Productos', route: '/home/products' },
        { label: 'Como funciona', route: '/home/how-it-works' },
        { label: 'Acerca de', route: '/home/about' },
        { label: 'Testimonios', route: '/home/testimonials' },
        { label: 'Contacto', route: '/home/contact' },
      ],
    },
    {
      id: 'productos',
      label: 'Productos',
      icon: 'P',
      sections: [
        { label: 'Listado', route: '/productos/listado' },
        { label: 'Categorías', route: '/productos/categorias' },
      ],
    },
    {
      id: 'contacto',
      label: 'Contacto',
      icon: 'C',
      sections: [
        { label: 'Formulario', route: '/contacto/formulario' },
        { label: 'Mapa', route: '/contacto/mapa' },
      ],
    },
    {
      id: 'nosotros',
      label: 'Nosotros',
      icon: 'N',
      sections: [
        { label: 'Equipo', route: '/nosotros/equipo' },
        { label: 'Historia', route: '/nosotros/historia' },
      ],
    },
  ];

  togglePage(pageId: string): void {
    this.openPageId.update((current) => (current === pageId ? null : pageId));
  }

  isPageOpen(pageId: string): boolean {
    return this.openPageId() === pageId;
  }
}