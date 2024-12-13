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
		loadChildren: () => import('./tasks/tasks.module').then((m) => m.TasksModule),
	},
	{
		path: '**',
		redirectTo: 'auth/login',
	},
];
