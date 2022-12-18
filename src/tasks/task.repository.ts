import { Task } from "./task.entity";
import { Repository, DataSource } from 'typeorm';
import { Injectable } from "@nestjs/common";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter";
import { User } from "src/auth/user.entity";
import { Logger, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class TaskRepository extends Repository<Task>{
  private logger = new Logger('TaskRepository');
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager())
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    query.where('task.userId = :userId', { userId: user.id })

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere('(tasks.title LIKE :search OR tas.description LIKE :search)', { search: `%${search}%` });
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(`Filed to get tasks for user "${user.username}", Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createTask(CreateTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    const { title, description } = CreateTaskDTO;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;

    await task.save();

    try {
      delete task.user;
      return task;
    } catch (error) {
      this.logger.error(`Filed to create task for user "${user.username}", Filters: ${JSON.stringify(CreateTaskDTO)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

} 