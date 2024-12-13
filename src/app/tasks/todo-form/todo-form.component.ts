import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TodoService } from '../todo.service';

@Component({
	selector: 'app-todo-form',
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule, MatButtonModule, MatIconModule, MatCardModule],
	templateUrl: './todo-form.component.html',
	styleUrl: './todo-form.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent {
	public taskForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private todoService: TodoService,
	) {
		this.taskForm = this.fb.group({
			id: [null],
			text: [null, [Validators.required, Validators.max(200)]],
			completed: [false],
		});
	}

	ngOnInit() {
		// Suscribirse en caso se carge una task para editar
		this.todoService.todoSource.subscribe((todo) => {
			if (todo) {
				this.taskForm.patchValue(todo); // Cargar los datos en el formulario
			}
		});
	}

	onSubmit() {
		if (this.taskForm.valid) {
			console.log(this.taskForm.value);
			this.taskForm.reset();
			// this.taskForm.patchValue({
			// 	id: 0,
			// 	text: null,
			// 	completed: false,
			// });
			//this.taskForm.markAsUntouched();
			//this.taskForm.markAsDirty()
			console.log(this.taskForm.value);
		}
	}
}
