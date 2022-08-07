import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async singUp(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }
  login(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    return this.userRepository.findBy({ email });
  }
}
