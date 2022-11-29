import { Task } from "./task.entity";
import { Repository, DataSource } from 'typeorm';
import { Injectable } from "@nestjs/common";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";

@Injectable()
export class TaskRepository extends Repository<Task>{
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager())
  }

  async createTask(CreateTaskDTO: CreateTaskDTO): Promise<Task> {
    const { title, description } = CreateTaskDTO;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    await task.save();

    return task;
  }

} 