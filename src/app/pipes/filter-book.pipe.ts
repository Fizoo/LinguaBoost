import { Pipe, PipeTransform } from '@angular/core';
import {Book} from "../models/book";

@Pipe({
  name: 'filterBook'
})
export class FilterBookPipe implements PipeTransform {

  transform(books: Book[] | null, selectedGenre: string, selectedLevel:string): Book[] {

    if (!books) {
      return [];
    }

    return books.filter(book => {
      const matchGenre = !selectedGenre || book.genre.toLowerCase() === selectedGenre.toLowerCase()
      const matchLevel = !selectedLevel || book.level.toLowerCase() === selectedLevel.toLowerCase()

      return matchGenre && matchLevel;
    });
  }
}

