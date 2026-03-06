import { Routes } from "@angular/router";
import { AuthLayout } from "./layout/authLayout/authLayout";
import { Login } from "./pages/login/login";


export const authRoutes:Routes = [
    {
        path: '',
        component: AuthLayout,
        children: [
            {
                path: 'login',
                component: Login,
            },
            {
                path: '**',
                redirectTo: 'login'
            }
        ]
    }
];


export default authRoutes;