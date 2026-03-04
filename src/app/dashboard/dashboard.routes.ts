import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { SectionCrudComponent } from './components/section-crud/section-crud.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: SectionCrudComponent },
      // Home
      { path: 'home/hero', component: SectionCrudComponent },
      { path: 'home/benefits', component: SectionCrudComponent },
      { path: 'home/products', component: SectionCrudComponent },
      { path: 'home/how-it-works', component: SectionCrudComponent },
      { path: 'home/about', component: SectionCrudComponent },
      { path: 'home/testimonials', component: SectionCrudComponent },
      { path: 'home/contact', component: SectionCrudComponent },
      // Productos
      { path: 'productos/listado', component: SectionCrudComponent },
      { path: 'productos/categorias', component: SectionCrudComponent },
      // Contacto
      { path: 'contacto/formulario', component: SectionCrudComponent },
      { path: 'contacto/mapa', component: SectionCrudComponent },
      // Nosotros
      { path: 'nosotros/equipo', component: SectionCrudComponent },
      { path: 'nosotros/historia', component: SectionCrudComponent },
    ],
  },
];

export default dashboardRoutes;