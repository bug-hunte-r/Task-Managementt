import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTask } from './create-task/create-task';
import type { Request, Response } from 'express';


@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    async setTask(@Body() createTask: CreateTask, @Req() req: Request): Promise<object> {

        await this.taskService.setTask(createTask, req)

        return {
            message: 'Task Add',
        }

    }

    @Get()
    async getTasks(@Req() req: Request, @Res() res: Response) {

        try {
            const allTasks = await this.taskService.getTasks(req)

            res.status(200).json({
                Tasks: allTasks
            })

        } catch (error) {
            res.status(error.getStatus ? error.getStatus() : 500).json({
                message: error.message
            })
        }

    }
}
