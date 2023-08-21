import { Pipe, PipeTransform } from '@angular/core';
import {Theme} from "../models/data";

@Pipe({
  name: 'filterTheme'
})
export class FilterThemePipe implements PipeTransform {

  transform(value: Theme[] | null, search:string=''): Theme[] {
    return value?value.filter(el=>el.name.toLowerCase().includes(search.toLowerCase())):[]
  }

}
