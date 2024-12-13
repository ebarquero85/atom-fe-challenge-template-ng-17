import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { taskInterface } from '../shared/interfaces/tasks';

@Injectable({
	providedIn: 'root',
})
export class TodoService {
	//
	public todoSource = new BehaviorSubject<taskInterface>({ id: 0, text: '', completed: false }); // Fuente de datos

	constructor() {}

	setTodo(todo: taskInterface) {
		this.todoSource.next(todo);
	}
}
