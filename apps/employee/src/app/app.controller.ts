import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import {
  ClientGrpc,
  GrpcMethod,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { EmployeeById } from '../assets/interfaces/employee-by-id.interface';
import { Employee } from '../assets/interfaces/employee.interface';

interface EmployeeService {
  findOne(data: EmployeeById): Observable<Employee>;
  }

@Controller('employee')
export class AppController implements OnModuleInit {
  private readonly items: Employee[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];
  private employeeService: EmployeeService;

  constructor(@Inject('EMPLOYEE_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.employeeService = this.client.getService<EmployeeService>('employeeService');
  }

  // @GrpcMethod('employeeService')
  // findOne(data: EmployeeById): Employee {
  //   return this.items.find(({ id }) => id === data.id);
  // }
  @GrpcMethod('employeeService','FindOne')
  findOne(data: EmployeeById): Employee {
    return this.items.find(({ id }) => id === data.id);
  }


}