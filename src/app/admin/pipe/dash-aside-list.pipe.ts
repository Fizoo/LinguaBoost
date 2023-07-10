import { Pipe, PipeTransform } from '@angular/core';
import {CollectTopic} from "../../models/data";

@Pipe({
  name: 'dashAsideList'
})
export class DashAsideListPipe implements PipeTransform {

  transform(value: CollectTopic[]|null, search: string=''): CollectTopic[] {
    //if(!search) return value
    return value?value.filter(el=>el.name.toLowerCase().includes(search.toLowerCase())):[]
  }

}
