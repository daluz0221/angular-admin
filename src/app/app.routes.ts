import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'admin',
        loadChildren: () => import('./dashboard/dashboard.routes')
    },
    {
        path: '',
        loadChildren: () => import('./auth/auth.routes')
    },
    { path: '**', redirectTo: ''},
];
