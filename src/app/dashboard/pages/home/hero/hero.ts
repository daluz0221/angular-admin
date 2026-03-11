import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HeroService } from '../../../services/home/hero.service';
import { HeroSection } from '../../../interfaces/home/hero.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../../../components/modal/modal';
import { SectionCrudComponent } from '../../../components/section-crud/section-crud.component';

const FIELD_LABELS: Record<string, string> = {
  headline: 'Título',
  highlightWord: 'Palabra destacada',
  subheadline: 'Subtítulo',
  imageUrl: 'Imagen',
  imageAlt: 'Imagen alt',
  textCta: 'Texto botón',
  urlCta: 'URL botón',
  isActive: 'Activo',
};

@Component({
  selector: 'app-hero',
  imports: [ModalComponent, ReactiveFormsModule, SectionCrudComponent],
  templateUrl: './hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {

  private heroService = inject(HeroService);
  private fb = inject(FormBuilder);
  heros = signal<HeroSection[]>([]);

  isEditModalOpen = signal(false);
  isCreateModalOpen = signal(false);
  /** Hero seleccionado para eliminar (null = modal cerrado) */
  heroToDelete = signal<HeroSection | null>(null);
  selectedHero = signal<HeroSection | null>(null);
  /** Mensajes de error del backend (create o edit) para mostrar en el modal */
  formErrors = signal<string[]>([]);

  editForm: FormGroup = this.fb.group({
    headline: ['', Validators.required],
    highlightWord: [''],
    subheadline: [''],
    imageUrl: ['', Validators.required],
    imageAlt: ['', Validators.required],
    textCta: ['', Validators.required],
    urlCta: ['', Validators.required],
    isActive: [true],
  });

  createForm: FormGroup = this.fb.group({
    headline: ['', Validators.required],
    highlightWord: [''],
    subheadline: [''],
    imageUrl: ['', Validators.required],
    imageAlt: ['', Validators.required],
    textCta: ['', Validators.required],
    urlCta: ['', Validators.required],
    isActive: [true],
  });

  herosResource = rxResource({
    params: () => ({}),
    stream: () =>
      this.heroService.getHeros().pipe(
        tap(heros => this.heros.set(heros)),
      ),
    defaultValue: []
  });

  openEdit(hero: HeroSection) {
    this.formErrors.set([]);
    this.selectedHero.set(hero);
    this.editForm.patchValue(hero);
    this.isEditModalOpen.set(true);
  }
  closeEdit() {
    this.isEditModalOpen.set(false);
    this.selectedHero.set(null);
    this.formErrors.set([]);
  }
  submitEdit() {
    if (this.editForm.invalid || !this.selectedHero()) {
      return;
    }
    this.formErrors.set([]);
    const payload = {
      ...this.selectedHero()!,
      ...this.editForm.value,
    };
    this.heroService.updateHero(payload).subscribe({
      next: () => {
        this.closeEdit();
        window.location.reload();
      },
      error: (err: HttpErrorResponse) => this.setFormErrors(err),
    });
  }

  openCreate() {
    this.formErrors.set([]);
    this.createForm.reset({ headline: '', highlightWord: '', subheadline: '', imageUrl: '', imageAlt: '', textCta: '', urlCta: '', isActive: true });
    this.isCreateModalOpen.set(true);
  }
  closeCreate() {
    this.isCreateModalOpen.set(false);
    this.formErrors.set([]);
  }
  submitCreate() {
    if (this.createForm.invalid) {
      return;
    }
    this.formErrors.set([]);
    this.heroService.createHero(this.createForm.value).subscribe({
      next: () => {
        this.closeCreate();
        this.herosResource.reload();
      },
      error: (err: HttpErrorResponse) => this.setFormErrors(err),
    });
  }

  /** Parsea el body del error (400, etc.) y actualiza formErrors para mostrarlos en el modal */
  private setFormErrors(err: HttpErrorResponse): void {
    const body = err.error;
    if (body && typeof body === 'object' && !Array.isArray(body)) {
      const messages: string[] = [];
      for (const [field, value] of Object.entries(body)) {
        const label = FIELD_LABELS[field] ?? field;
        const list = Array.isArray(value) ? value : [value];
        for (const msg of list) {
          messages.push(typeof msg === 'string' ? `${label}: ${msg}` : `${label}: error de validación`);
        }
      }
      this.formErrors.set(messages.length ? messages : [err.message || 'Error al guardar']);
    } else {
      this.formErrors.set([typeof body === 'string' ? body : err.message || 'Error al guardar']);
    }
  }
 
  openDeleteConfirm(hero: HeroSection) {
    this.heroToDelete.set(hero);
  }
  closeDeleteConfirm() {
    this.heroToDelete.set(null);
  }
  confirmDelete() {
    const hero = this.heroToDelete();
    if (!hero) return;
    this.heroService.deleteHero(hero.id).subscribe({
      next: () => {
        this.closeDeleteConfirm();
        this.herosResource.reload();
      },
    });
  }
}
  
  
