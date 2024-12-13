import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TodoService } from '../todo.service';
import { taskInterface } from '../../shared/interfaces/tasks';

@Component({
	selector: 'app-todo-list',
	standalone: true,
	imports: [MatListModule, MatButtonModule, MatIconModule, CommonModule, MatCheckboxModule],
	templateUrl: './todo-list.component.html',
	styleUrl: './todo-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
	todos = [
		{ id: 1, text: 'Tarea 1', completed: true },
		{ id: 2, text: 'Tarea 2', completed: false },
		{ id: 3, text: 'Tarea 3', completed: false },
	];

	constructor(private todoService: TodoService) {}

	updateCheck(completed: boolean, id: number) {
		console.log({ completed });
		console.log({ id });
	}

	loadTask(task: taskInterface) {
		this.todoService.setTodo(task);
	}

	deleteTask(id: number) {
		console.log(`delete: ${id}`);
	}
}
