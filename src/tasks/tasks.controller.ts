import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(
    @Body() CreateTaskDTO: CreateTaskDTO
  ) {
    return this.tasksService.createTask(CreateTaskDTO);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id') id: string
  ): Task[] {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/:field')
  updateTaskField(
    @Param('id') id: string,
    @Param('field') field: string,
    @Body('value') newValue: any
  ): Task {
    return this.tasksService.updateTaskField(id, field, newValue);
  }

}
