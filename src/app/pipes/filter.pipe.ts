import { Pipe, PipeTransform } from '@angular/core';
import {Data} from "../models/data";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Data[]|null, search=''): Data[] {

    return value?value.filter(el=>el.englishWord.includes(search)):[]
  }

}
