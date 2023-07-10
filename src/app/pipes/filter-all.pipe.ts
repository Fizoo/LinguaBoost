import {Pipe, PipeTransform} from '@angular/core';
import {Theme, TopicPhrases, Words} from '../models/data';

@Pipe({
  name: 'filterAll'
})
export class FilterAllPipe implements PipeTransform {
  transform<T>(value: T[] | null, search: string = '', filterType: string = ''): T[] {
    if (!value) return []

      switch (filterType) {
        case 'phrases':
          return value.filter((el) =>
            (el as TopicPhrases).name && (el as TopicPhrases).name.toLowerCase().includes(search.toLowerCase())
          );
        case 'theme':
          return value.filter((el) =>
            (el as Theme).name.toLowerCase().includes(search.toLowerCase())
          );
        case 'words':
          return value.filter((el) =>
            (el as Words).englishWord.includes(search.toLowerCase())
          );
        default:
          return value;
      }

  }
}
