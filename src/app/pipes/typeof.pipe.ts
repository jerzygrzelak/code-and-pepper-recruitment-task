import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'typeof'
})
export class TypeofPipe implements PipeTransform {

  transform(value: any): any {
    return typeof value;
  }
}
