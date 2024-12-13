import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { taskInterface } from '../shared/interfaces/tasks';

@Injectable({
	providedIn: 'root',
})
export class TodoService {
	//
	public todoSource = new BehaviorSubject<taskInterface>({ id: 0, text: '', completed: false, date: new Date() });

	public taskList = new BehaviorSubject<taskInterface[]>([
		{ id: 1, text: 'Tarea 1', completed: true, date: new Date('2024-12-12T14:30:00') },
		{ id: 2, text: 'Tarea 2', completed: false, date: new Date('2024-12-10T08:00:00') },
		{ id: 3, text: 'Tarea 3', completed: false, date: new Date('2024-12-13T10:00:00') },
		{ id: 4, text: 'Tarea 4', completed: true, date: new Date('2024-12-14T12:00:00') },
	]);

	constructor() {}

	setTask(todo: taskInterface) {
		this.todoSource.next(todo);
	}

	addNewTask(task: taskInterface) {
		task.date = new Date();
		const currentTasks = [task, ...this.taskList.value];
		this.taskList.next(currentTasks);
	}
}
