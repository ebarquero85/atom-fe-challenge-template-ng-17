import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskInterface } from '../shared/interfaces/tasks';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../shared/constants/api';

@Injectable({
	providedIn: 'root',
})
export class TodoService {
	//
	public taskLoaded = new BehaviorSubject<TaskInterface>({
		id: '',
		userId: '',
		title: '',
		description: '',
		completed: false,
		deleted: false,
		createdAt: '',
	});

	public taskList = new BehaviorSubject<TaskInterface[]>([]);

	constructor(private http: HttpClient) {}

	getTasks(): Observable<TaskInterface[]> {
		const userId = localStorage.getItem('userId');
		return this.http.get<TaskInterface[]>(`${apiUrl}/tasks/${userId}`);
	}

	updateTask(task: TaskInterface): Observable<any> {
		return this.http.put<TaskInterface>(`${apiUrl}/tasks/${task.id}`, {
			title: task.title,
			description: task.description,
			completed: task.completed,
		});
	}

	deleteTask(taskId: string): Observable<any> {
		return this.http.delete(`${apiUrl}/tasks/${taskId}`);
	}

	setTask(todo: TaskInterface) {
		this.taskLoaded.next(todo);
	}

	createTask(task: TaskInterface): Observable<TaskInterface> {
		return this.http.post<TaskInterface>(`${apiUrl}/tasks`, task);
	}
}
