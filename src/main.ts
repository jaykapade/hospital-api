import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Setup Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
      // ! transform used to auto transform data from user based on typeorm types set. eg: datasent:string, dataneeded:number
      // transform: true,
      // transformOptions: {
      //   enableImplicitConversion: true,
      // },
    }),
  );
  //! Use this if no dependencies from app
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(3000);
}
bootstrap();
