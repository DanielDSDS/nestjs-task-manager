import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {


  constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {

  }

  //private tasks: Task[] = [];
  //getAllTasks(): Task[] {
  //return this.tasks;
  //}

  //getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
  //const { status, search } = filterDto;

  //let tasks = this.getAllTasks();

  //if (status) {
  //tasks = tasks.filter(task => task.status === status)
  //}

  //if (search) {
  //tasks = tasks.filter(task =>
  //task.title.includes(search) ||
  //task.description.includes(search)
  //)
  //}

  //return tasks;
  //}

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOneBy({ id });

    if (!found)
      throw new NotFoundException('task not found');

    return found;
  }

  async createTask(CreateTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(CreateTaskDTO);
  }

  //deleteTask(id: string): Task[] {
  //const found = this.getTaskById(id);
  //return this.tasks.filter(task => task.id !== found.id)
  //}

  //updateTaskStatus(id: string, status: TaskStatus): Task {
  //const task = this.getTaskById(id);
  //task.status = status;
  //return task;
  //}
}
