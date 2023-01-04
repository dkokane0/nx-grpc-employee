import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { EmployeeService } from './interfaces/employee.interface';


interface EmployeeById {
  id: number;
}
@Controller()
export class AppController implements OnModuleInit {
  private employeeService: EmployeeService;

  constructor(@Inject('EMPLOYEE_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.employeeService = this.client.getService<EmployeeService>(
      'employeeService',
    );
  }
  @GrpcMethod('employeeService', 'FindOne')
  findOneEmployee(body:EmployeeById) {
    return this.employeeService.findOne({ numbers: body.id }).toPromise();
  }
  //  hello() {
  //     return {msg:"hello from employee-service "};
  //   }
}
