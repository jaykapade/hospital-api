import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
  async signUp(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const user = await this.userRepository.findBy({ email });
    if (user.length)
      throw new HttpException(
        'Email already registered',
        HttpStatus.BAD_REQUEST,
      );
    return await this.userRepository.save(createUserDto);
  }
  login(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    return this.userRepository.findBy({ email });
  }
}
