import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.html',
  // imports: [NgClass, RouterLink, RouterLinkActive],
})
export class ModalComponent {
  @Input() title = '';
  /** Texto del botón de confirmar (por defecto "Guardar") */
  @Input() confirmLabel = 'Guardar';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  onConfirm() { this.confirm.emit(); }
  onCancel() { this.cancel.emit(); }
}