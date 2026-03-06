import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs';

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class HeroService  {
 

    private http = inject(HttpClient);



    getHeros() {
        return this.http.get<any>(`${baseUrl}home/hero`)
        .pipe(
            tap(response => console.log(response))
        )
    }

}