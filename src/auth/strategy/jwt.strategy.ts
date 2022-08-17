import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { JwtPayload } from '../dto/jwt-payload.dto';
import { User } from '../entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
    console.log('secret', process.env.JWT_SECRET);
  }

  async validate(payload: JwtPayload): Promise<User> {
    console.log('🚀 ~ payload', payload);
    const { sub: id } = payload;

    const user = await this.userRepository.findOneBy({ id });
    console.log('🚀 ~ user', user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
