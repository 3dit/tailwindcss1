import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'testPipe',
  standalone: true
})
export class TestPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return `***${value}***`;
  }

}
