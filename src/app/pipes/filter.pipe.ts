import { Pipe, PipeTransform } from '@angular/core';
import {Data, Words} from "../models/data";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Words[]|null, search=''): Words[] {

    return value?value.filter(el=>el.englishWord.includes(search)):[]
  }

}
