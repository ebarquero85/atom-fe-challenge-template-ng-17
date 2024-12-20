import { Component } from '@angular/core';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [
		TodoFormComponent,
		TodoListComponent,
		MatCardModule,
		MatGridListModule,
		MatIconModule,
		MatDividerModule,
		MatFormFieldModule,
		MatButtonModule,
	],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class HomeComponent {
	//
	public email: string = '';

	constructor(private router: Router) {
		if (!localStorage.getItem('userId')) {
			this.router.navigate(['/auth/login']);
		}
	}

	ngOnInit() {
		this.email = localStorage.getItem('email') || '';
	}

	logout() {
		localStorage.clear();
		this.router.navigate(['/auth/login']);
	}
}
