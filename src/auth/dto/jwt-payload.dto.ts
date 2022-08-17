import { IsEmail, IsString } from 'class-validator';

export class JwtPayload {
  @IsString()
  sub: number;

  @IsEmail()
  email: string;
}

// 🚀 ~ payload {
//     sub: '8ac4d20a-0be5-4eeb-a05d-826acc78d7c0',
//     email: 'test@fmail.com',
//     iat: 1660745898,
//     exp: 1660832298
//   }
