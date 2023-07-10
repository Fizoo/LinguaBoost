import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dashCList'
})
export class DashCListPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
