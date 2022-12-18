import { Query, Body, Controller, Delete, Get, Param, Patch, Post, ParseIntPipe, ValidationPipe, UsePipes, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter';
import { Task } from './task.entity';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Logger } from '@nestjs/common';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(private tasksService: TasksService) { }

  @Get()
  @UsePipes(ValidationPipe)
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User
  ): Promise<Task[]> {
    this.logger.verbose(`User ${user.username} retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`);
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Task> {
    const found = this.tasksService.getTaskById(id, user);

    if (!found) {
      throw new NotFoundException('Task with given id not found');
    }

    return found
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() CreateTaskDTO: CreateTaskDTO,
    @GetUser() user: User
  ): Promise<Task> {
    this.logger.verbose(`User "${user.username} creating a new task. Data: ${JSON.stringify(CreateTaskDTO)}`)
    return this.tasksService.createTask(CreateTaskDTO, user);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status, user);
  }

}
