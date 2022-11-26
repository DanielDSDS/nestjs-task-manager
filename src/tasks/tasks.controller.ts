import { Query, Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe, UsePipes, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter';
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
  ): Task[] {

    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilter(filterDto);
    }

    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    const found = this.tasksService.getTaskById(id);

    if (!found) {
      throw new NotFoundException('Task with given id not found');
    }

    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
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
