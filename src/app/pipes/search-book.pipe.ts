import { Pipe, PipeTransform } from '@angular/core';
import {Book} from "../models/book";

@Pipe({
  name: 'searchBook'
})
export class SearchBookPipe implements PipeTransform {

  transform(books: Book[]| null, searchValue:string=''): Book[] {

    if (!books) {
      return []; // Повертаємо пустий масив, якщо books є null
    }

    if (searchValue.trim() === '') {
      return books;
    }

    const normalizedSearch=searchValue.toLowerCase().trim()

    return books.filter(book=>
      book.book_title.toLowerCase().includes(normalizedSearch) ||
      book.author.toLowerCase().includes(normalizedSearch)
    )
  }

}
