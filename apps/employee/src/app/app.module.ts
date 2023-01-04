import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { resolve } from 'path';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EMPLOYEE_PACKAGE',  // created new package name
        transport: Transport.GRPC,
        options: {
          package: 'employee',  // ['multiple','second package']
          protoPath: resolve(__dirname, '../../../proto-file/employee.proto'), // same need to add multiple path
          url: 'localhost:3002',
        },
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {}


