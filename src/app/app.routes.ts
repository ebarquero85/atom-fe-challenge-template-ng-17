import { Routes } from '@angular/router';

export const routes: Routes = [
	// {
	// 	path: '',
	// 	redirectTo: '/home',
	// 	pathMatch: 'full',
	// },
	// {
	// 	path: 'home',
	// 	loadComponent: () => import('./modules/example-page/example-page.component').then((m) => m.ExamplePageComponent),
	// },
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
