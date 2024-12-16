import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TodoService } from '../todo.service';
import Swal from 'sweetalert2';
import { TaskInterface } from '../../shared/interfaces/tasks';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
	selector: 'app-todo-form',
	standalone: true,
	imports: [
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatCardModule,
		MatProgressSpinnerModule,
	],
	templateUrl: './todo-form.component.html',
	styleUrl: './todo-form.component.scss',
})
export class TodoFormComponent {
	public taskForm: FormGroup;
	public isSaving: boolean = false;

	constructor(
		private fb: FormBuilder,
		private todoService: TodoService,
	) {
		this.taskForm = this.fb.group({
			id: [null],
			title: [null, [Validators.required, Validators.max(100)]],
			description: [null, [Validators.required, Validators.max(200)]],
			completed: [false],
		});
	}

	ngOnInit() {
		// Suscribirse en caso se carge una task para editar
		this.todoService.taskLoaded.subscribe((todo) => {
			if (todo) {
				this.taskForm.patchValue(todo);
			}
		});
	}

	onSubmit() {
		if (this.taskForm.valid) {
			let newTask: any = {
				id: this.taskForm.get('id')?.value,
				userId: localStorage.getItem('userId'),
				title: this.taskForm.get('title')?.value,
				description: this.taskForm.get('description')?.value,
			};

			this.isSaving = true;

			// Actualizar
			if (this.taskForm.get('id')?.value) {
				newTask.completed = this.todoService.taskLoaded.getValue().completed;
				this.todoService.updateTask(newTask).subscribe((v) => {
					this.todoService.getTasks().subscribe((v) => {
						this.todoService.taskList.next(v);
						this.isSaving = false;
						this.taskForm.reset();
					});
				});
			} else {
				// Guardar nueva tarea
				this.todoService.createTask(newTask).subscribe((task) => {
					this.isSaving = false;
					this.taskForm.reset();

					const currentItems: TaskInterface[] = this.todoService.taskList.getValue();
					const updatedItems: TaskInterface[] = [task, ...currentItems];

					this.todoService.taskList.next(updatedItems);

					Swal.fire({
						//title: 'Tarea Agregada',
						text: 'Tarea Agregada',
						icon: 'success',
						timer: 2500,
						showConfirmButton: false,
					});
				});
			}
		}
	}
}
