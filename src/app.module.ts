import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { UsersController } from './users/users.controller';

@Module({
  imports: [UsersModule],
  providers: [UsersService, TaskService],
  controllers: [TaskController, UsersController],
})
export class AppModule { }
