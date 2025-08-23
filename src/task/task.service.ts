import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTask } from './create-task/create-task';
import Task from 'models/task';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TaskService {

    constructor(private readonly usersService: UsersService) { }

    async setTask(createTask: CreateTask, req: Request) {

        const user = await this.usersService.getUserFromRequest(req)

        const userId = user._id

        await Task.create({ title: createTask.title, user: userId })
    }

    async getTasks(req: Request) {

        const mainUser = await this.usersService.getUserFromRequest(req)

        const tasks = await Task.find({ user: mainUser._id })

        if (tasks.length === 0) {
            throw new NotFoundException('This user not have any task yet')
        }

        return tasks
    }
}
