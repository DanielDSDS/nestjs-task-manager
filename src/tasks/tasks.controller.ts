import { Query, Body, Controller, Delete, Get, Param, Patch, Post, ParseIntPipe, ValidationPipe, UsePipes, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter';
import { Task } from './task.entity';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  //@Get()
  //@UsePipes(ValidationPipe)
  //getTasks(
  //@Query() filterDto: GetTasksFilterDto,
  //): Task[] {

  //if (Object.keys(filterDto).length) {
  //return this.tasksService.getTasksWithFilter(filterDto);
  //}

  //return this.tasksService.getAllTasks();
  //}

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    const found = this.tasksService.getTaskById(id);

    if (!found) {
      throw new NotFoundException('Task with given id not found');
    }

    return found
  }

  //return this.tasksService.getTaskById(id);
  //}

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() CreateTaskDTO: CreateTaskDTO
  ): Promise<Task> {
    return this.tasksService.createTask(CreateTaskDTO);
  }

  //@Delete('/:id')
  //deleteTask(
  //@Param('id') id: string
  //): Task[] {
  //return this.tasksService.deleteTask(id);
  //}

  //@Patch('/:id/status')
  //updateTaskStatus(
  //@Param('id') id: string,
  //@Body('status', TaskStatusValidationPipe) status: TaskStatus
  //): Task {
  //return this.tasksService.updateTaskStatus(id, status);
  //}

}
