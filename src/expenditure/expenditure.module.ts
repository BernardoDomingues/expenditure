import { Module } from '@nestjs/common';

import { ExpenditureService } from './expenditure.service';
import { UsersService } from 'src/users/users.service';
import { ExpenditureRepository } from './expenditure.repository';
import { UserRepository } from 'src/users/users.repository';
import { ExpenditureController } from './expenditure.controller';

@Module({
  imports: [],
  providers: [
    ExpenditureService,
    UsersService,
    ExpenditureRepository,
    UserRepository,
  ],
  controllers: [ExpenditureController],
})
export class ExpenditureModule {}
