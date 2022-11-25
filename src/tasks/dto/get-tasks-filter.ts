import { TaskStatus } from "../tasks.model";

export class GetTasksFilterDto {
  search: string;
  status: TaskStatus;
}