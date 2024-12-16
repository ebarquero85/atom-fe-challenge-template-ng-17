import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
	},
	{
		path: 'home',
		loadChildren: () => import('./tasks/todo.module').then((m) => m.TodoModule),
	},
	{
		path: '**',
		redirectTo: 'auth/login',
	},
];
