import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-section-crud',
  standalone: true,
  templateUrl: './section-crud.component.html',
})
export class SectionCrudComponent {

  title = input<string>('Gestión de sección');
  createClick = output<void>();
}

