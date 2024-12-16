import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../../shared/constants/api';
import { ResponseAuth } from '../../shared/interfaces/auth';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatCardModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatGridListModule,
		MatProgressSpinnerModule,
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
})
export class LoginComponent {
	loginForm: FormGroup;

	public isLoading: boolean = false;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private http: HttpClient,
	) {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
		});
	}

	getEmailErrorMessage() {
		const email = this.loginForm.get('email');
		if (email?.hasError('required')) {
			return 'El correo es obligatorio.';
		}
		if (email?.hasError('pattern')) {
			return 'El correo no tiene un formato válido.';
		}
		return '';
	}

	onSubmit() {
		if (this.loginForm.valid) {
			const email = this.loginForm.get('email')?.value;

			this.isLoading = true;

			this.http.get<ResponseAuth>(`${apiUrl}/users/${email}`).subscribe((data: ResponseAuth) => {
				this.isLoading = false;

				if (data) {
					localStorage.setItem('userId', data.id);
					localStorage.setItem('email', data.email);
					this.router.navigate(['/home']);
				} else {
					Swal.fire({
						title: `${email}`,
						text: 'El correo no existe. ¿Desea crear una cuenta?',
						icon: 'warning',
						showCancelButton: true,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Si. Registrarme!',
					}).then((result) => {
						if (result.isConfirmed) {
							this.http.post<ResponseAuth>(`${apiUrl}/users`, { email }).subscribe((data: ResponseAuth) => {
								localStorage.setItem('userId', data.id);
								localStorage.setItem('email', data.email);
								this.router.navigate(['/home']);
							});
						}
					});
				}
			});
		}
	}
}
