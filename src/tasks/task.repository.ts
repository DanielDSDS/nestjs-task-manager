import { Task } from "./task.entity";
import { Repository, DataSource } from 'typeorm';
import { Injectable } from "@nestjs/common";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter";
import { User } from "src/auth/user.entity";

@Injectable()
export class TaskRepository extends Repository<Task>{
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

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(CreateTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    const { title, description } = CreateTaskDTO;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;

    await task.save();

    delete task.user;

    return task;
  }

} 