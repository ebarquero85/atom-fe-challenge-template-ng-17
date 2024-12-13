import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TodoService } from '../todo.service';
import { taskInterface } from '../../shared/interfaces/tasks';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
	selector: 'app-todo-list',
	standalone: true,
	imports: [MatListModule, MatButtonModule, MatIconModule, CommonModule, MatCheckboxModule, MatFormFieldModule],
	templateUrl: './todo-list.component.html',
	styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
	constructor(private todoService: TodoService) {}

	allTask: taskInterface[] = [];

	ngOnInit() {
		// Suscribirse en caso se carge una task para editar
		this.todoService.taskList.subscribe((task) => {
			if (task.length) {
				this.allTask = this.orderTask(task);
			} else {
				this.allTask = [];
			}
		});
	}

	orderTask(data: taskInterface[]): taskInterface[] {
		const sortedData = [...data].sort((a, b) => {
			// Primero, ordenamos por completado: las incompletas (false) deben ir al principio
			if (a.completed === b.completed) {
				// Si tienen el mismo estado de completado, ordenamos por fecha (más reciente primero)
				return b.date.getTime() - a.date.getTime();
			} else {
				// Si son diferentes, las incompletas (false) van antes
				return a.completed ? 1 : -1;
			}
		});
		return sortedData;
	}

	updateCheck(completed: boolean, id: number) {
		console.log({ completed });
		console.log({ id });
	}

	loadTask(task: taskInterface) {
		this.todoService.setTask(task);
	}

	deleteTask(id: number) {
		console.log(`delete: ${id}`);
		Swal.fire({
			//title: 'Tarea Agregada',
			text: 'Tarea Eliminada',
			icon: 'success',
			timer: 2000,
			showConfirmButton: false,
		});
	}
}
