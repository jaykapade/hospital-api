import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async signUp(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const registeredUser = await this.userRepository.findBy({ email });
    if (registeredUser.length)
      throw new HttpException(
        'Email already registered',
        HttpStatus.BAD_REQUEST,
      );

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = this.userRepository.create({ email, password: hash });
    return await this.userRepository.save(user);
  }

  async login(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user = await this.userRepository.findOneBy({ email });
    console.log('🚀 ~ user', user);
    if (!user) throw new UnauthorizedException('No User Found');

    const isValid = bcrypt.compareSync(password, user.password);
    console.log('🚀 ~ isValid', isValid);

    if (!isValid) throw new UnauthorizedException('No User Found');

    return user;
  }
}
