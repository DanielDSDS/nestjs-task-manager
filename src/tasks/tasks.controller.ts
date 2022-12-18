import { Query, Body, Controller, Delete, Get, Param, Patch, Post, ParseIntPipe, ValidationPipe, UsePipes, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter';
import { Task } from './task.entity';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  @UsePipes(ValidationPipe)
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    const found = this.tasksService.getTaskById(id);

    if (!found) {
      throw new NotFoundException('Task with given id not found');
    }

    return found
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() CreateTaskDTO: CreateTaskDTO
  ): Promise<Task> {
    return this.tasksService.createTask(CreateTaskDTO);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number
  ): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status);
  }

}
