import { Task } from "./task.entity";
import { Repository, DataSource } from 'typeorm';
import { Injectable } from "@nestjs/common";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter";

@Injectable()
export class TaskRepository extends Repository<Task>{
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager())
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    const tasks = await query.getMany();
    return tasks;
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