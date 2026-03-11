import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { map, Observable, of, tap } from 'rxjs';
import { HeroSection } from '../../interfaces/home/hero.interface';

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class HeroService  {
 

    private http = inject(HttpClient);
    private heroCache = new Map<string, HeroSection[]>();



    getHeros(): Observable<HeroSection[]> {
       const key = "hero-admin-list";
       if(this.heroCache.has(key)) {
        return of(this.heroCache.get(key)!);
       }
       return this.http.get<{ heros: HeroSection[] }>(`${baseUrl}home/hero`)
       .pipe(
        tap(response => console.log('response', response)),
       tap(response => {
         this.heroCache.set(key, response.heros);
       }),
       map((response: { heros: HeroSection[] }) => response.heros)
       )
    }
    updateHero(hero: HeroSection): Observable<HeroSection> {
      return this.http.patch<HeroSection>(`${baseUrl}home/hero/${hero.id}`, hero)
      .pipe(
        tap(() => console.log('hero updated')),
        map((response: HeroSection) => response)
      )
    }

    createHero(hero: Omit<HeroSection, 'id'>): Observable<HeroSection> {
      return this.http.post<HeroSection>(`${baseUrl}home/hero`, hero).pipe(
        tap(() => {
          this.heroCache.delete('hero-admin-list');
        }),
        map((response: HeroSection) => response)
      );
    }

    deleteHero(id: number): Observable<void> {
      return this.http.delete<void>(`${baseUrl}home/hero/${id}`).pipe(
        tap(() => {
          this.heroCache.delete('hero-admin-list');
        })
      );
    }

}