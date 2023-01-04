import { Observable } from 'rxjs';

export interface EmployeeService {
  findOne: (data: { numbers: number }) => Observable<{ result: number }>;
}
