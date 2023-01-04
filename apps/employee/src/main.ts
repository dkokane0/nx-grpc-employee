import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import path = require('path');

import { AppModule } from './app/app.module';

async function bootstrap() {
  const URL = 'localhost:3001';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: URL,
        package: 'employee',  //
        protoPath: path.resolve(__dirname, '../../proto-file/employee.proto'),
        // protoPath: join(__dirname, '..','..','/proto-file/employee.proto'),
        loader: {
          includeDirs: [path.resolve(__dirname, '../..')],
        },
      },
    },
    );
    

  await app.listen();
    Logger.log(
    `🚀 Application is running on: http://${URL}`
  );

}

bootstrap();
