import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcryptjs from 'bcryptjs';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(createUserDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = createUserDto;

    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username is used.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
