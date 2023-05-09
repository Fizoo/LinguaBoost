import { Pipe, PipeTransform } from '@angular/core';
import {Theme} from "../models/data";

@Pipe({
  name: 'filterTheme'
})
export class FilterThemePipe implements PipeTransform {

  transform(value: Theme[], search:string=''): Theme[] {
   if(!search) return value

    return value.filter(el=>el.name.toLowerCase().includes(search.toLowerCase()))
  }

}
