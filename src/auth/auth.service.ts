import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/register-user.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
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

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new UnauthorizedException('No User Found');

    const isValid = bcrypt.compareSync(password, user.password);

    if (!isValid) throw new UnauthorizedException('No User Found');

    const { id } = user;
    console.log('🚀 ~ id', id);
    const payload = { sub: id, email };
    const token = await this.jwtService.sign(payload);
    console.log('🚀 ~ accessToken', token);

    return { token };
  }
}
