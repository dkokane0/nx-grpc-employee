import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// import path = require('path');
import * as path from 'path';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const URL = 'localhost:3002';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: URL,
        package: 'employee',
        protoPath: path.resolve(__dirname, '../../proto-file/employee.proto'),
      },
    },
  ); 
  await app.listen();
  console.log("#######################");
  Logger.log(
    `🚀 Application is running clientSide on: http://${URL}`
  );
}

bootstrap();
