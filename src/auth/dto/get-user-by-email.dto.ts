import { User } from 'src/entities/user-entity';

export class GetUserByEmailDto {
  status: boolean;
  userData: User | any;
}
