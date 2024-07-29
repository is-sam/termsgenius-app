import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showMore',
  standalone: true
})
export class ShowMorePipe implements PipeTransform {

  transform(value: string, showMore: boolean, maxLines: number = 5): string {
    if (showMore || !value) {
      return value;
    }

    const lines = value.split('\n');
    if (lines.length <= maxLines) {
      return value;
    }

    return lines.slice(0, maxLines).join('\n') + '...';
  }

}
