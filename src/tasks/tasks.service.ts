import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor() { }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(task => task.status === status)
    }

    if (search) {
      tasks = tasks.filter(task =>
        task.title.includes(search) ||
        task.description.includes(search)
      )
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  createTask(CreateTaskDTO: CreateTaskDTO): Task {
    const { title, description } = CreateTaskDTO;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): Task[] {
    return this.tasks.filter(task => task.id !== id)
  }

  updateTaskField(id: string, field: string, newValue: any): Task {
    const task = this.getTaskById(id);
    console.log(field)
    task[field] = newValue
    return task;
  }
}
