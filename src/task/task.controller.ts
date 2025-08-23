import { Body, Controller, Post, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTask } from './create-task/create-task';
import type { Request } from 'express';


@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    async setCategory(@Body() createTask: CreateTask, @Req() req: Request): Promise<object> {

        await this.taskService.setCategory(createTask, req)

        return {
            message: 'Task Add',

        }

    }
}
