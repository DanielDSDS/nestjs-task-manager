import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [1, 2, 3];

  constructor() { }

  getAllTasks = () => {
    return this.tasks;
  }
}
