import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { SectionCrudComponent } from './components/section-crud/section-crud.component';

import { Hero } from './pages/home/hero/hero';
import { Benefits } from './pages/home/benefits/benefits';
import { Products } from './pages/home/products/products';
import { HowWorks } from './pages/home/how-works/how-works';
import { About } from './pages/home/about/about';
import { Testimonial } from './pages/home/testimonial/testimonial';
import { Contact } from './pages/home/contact/contact';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: SectionCrudComponent },
      // Home
      { path: 'home/hero', component: Hero },
      { path: 'home/beneficios', component: Benefits },
      { path: 'home/products', component: Products },
      { path: 'home/como-funciona', component: HowWorks },
      { path: 'home/acerca-de', component: About },
      { path: 'home/testimonios', component: Testimonial },
      { path: 'home/contacto', component: Contact },
      // Productos
      { path: 'productos/introducción', component: SectionCrudComponent },
      { path: 'productos/productos', component: SectionCrudComponent },
      { path: 'productos/categorias', component: SectionCrudComponent },
      // Contacto
      { path: 'contacto/formulario', component: SectionCrudComponent },
      { path: 'contacto/información', component: SectionCrudComponent },
      // Nosotros
      { path: 'nosotros/introducción', component: SectionCrudComponent },
      { path: 'nosotros/historia', component: SectionCrudComponent },
      { path: 'nosotros/visión', component: SectionCrudComponent },
      { path: 'nosotros/diferenciadores', component: SectionCrudComponent },
      { path: 'nosotros/equipo', component: SectionCrudComponent },
    ],
  },
];

export default dashboardRoutes;