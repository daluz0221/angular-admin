import { Routes } from '@angular/router';
import { isAdminGuard } from './auth/guards/is-admin.guard';

export const routes: Routes = [
    { path: 'admin',
        canActivate: [isAdminGuard],
        loadChildren: () => import('./dashboard/dashboard.routes')
    },
    {
        path: '',
        loadChildren: () => import('./auth/auth.routes')
    },
    { path: '**', redirectTo: ''},
];
