import { Module } from '@nestjs/common';

import { UserRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [],
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
})
export class UsersModule {}
