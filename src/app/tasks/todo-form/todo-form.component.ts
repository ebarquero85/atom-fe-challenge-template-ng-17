import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

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

	constructor(private fb: FormBuilder) {
		this.taskForm = this.fb.group({
			name: ['', [Validators.required, Validators.max(200)]],
		});
	}

	onSubmit() {
		if (this.taskForm.valid) {
			console.log(this.taskForm.value);
		}
	}
}
