import { Component } from '@angular/core';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { TodoListComponent } from '../todo-list/todo-list.component';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [TodoFormComponent, TodoListComponent, MatCardModule, MatGridListModule, MatIconModule, MatDividerModule, MatFormFieldModule],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class HomeComponent {
	//

	constructor(private router: Router) {}

	logout() {
		localStorage.clear();
		this.router.navigate(['/auth/login']);
	}
}
