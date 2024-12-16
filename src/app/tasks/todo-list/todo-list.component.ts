import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TodoService } from '../todo.service';
import { TaskInterface } from '../../shared/interfaces/tasks';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
	selector: 'app-todo-list',
	standalone: true,
	imports: [MatListModule, MatButtonModule, MatIconModule, CommonModule, MatCheckboxModule, MatFormFieldModule, MatProgressSpinnerModule],
	templateUrl: './todo-list.component.html',
	styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
	//
	public isLoadingTask = false;
	public allTask: TaskInterface[] = [];
	private taskSubscription$: Subscription | null = null;

	constructor(public todoService: TodoService) {
		this.todoService.taskList.subscribe((task) => {
			this.allTask = task;
			this.sortTasks();
		});
	}

	ngOnInit() {
		this.isLoadingTask = true;

		this.taskSubscription$ = this.todoService.getTasks().subscribe((data: TaskInterface[]) => {
			this.isLoadingTask = false;
			this.todoService.taskList.next(data);
		});
	}

	sortTasks() {
		this.allTask.sort((a, b) => {
			const dateComparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
			return dateComparison;
		});
		this.allTask.sort((a, b) => {
			if (a.completed === b.completed) return 0;
			return a.completed ? 1 : -1;
		});
	}

	updateCheck(completed: boolean, id: string) {
		let task = this.allTask.find((t) => t.id === id);

		if (task) {
			task.completed = completed;
			this.todoService.updateTask(task).subscribe((v) => {});
		}
	}

	loadTask(task: TaskInterface) {
		this.todoService.setTask(task);
	}

	deleteTask(id: string) {
		this.todoService.deleteTask(id).subscribe((v) => {
			Swal.fire({
				//title: 'Tarea Agregada',
				text: 'Tarea Eliminada',
				icon: 'success',
				timer: 2000,
				showConfirmButton: false,
			});

			this.todoService.getTasks().subscribe((v) => {
				this.todoService.taskList.next(v);
			});
		});
	}

	ngOnDestroy(): void {
		if (this.taskSubscription$) {
			this.taskSubscription$.unsubscribe();
		}
	}
}
