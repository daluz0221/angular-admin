import { Routes } from "@angular/router";
import { AuthLayout } from "./layout/authLayout/authLayout";
import { Login } from "./pages/login/login";
import { ChangePassword } from "./pages/change-password/change-password";

export const authRoutes: Routes = [
    {
        path: '',
        component: AuthLayout,
        children: [
            { path: 'login', component: Login },
            { path: 'auth/change-password', component: ChangePassword },
            { path: '**', redirectTo: 'login' },
        ],
    },
];


export default authRoutes;