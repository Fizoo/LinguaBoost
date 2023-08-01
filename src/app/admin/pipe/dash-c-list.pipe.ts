import { Pipe, PipeTransform } from '@angular/core';
import {CollectTopicItem} from "../../models/data";

@Pipe({
  name: 'dashCList'
})
export class DashCListPipe implements PipeTransform {

  transform(list: CollectTopicItem[], search:string=''): CollectTopicItem[] {
    return list.filter(el=>el.text.toLowerCase().includes(search.toLowerCase()))
  }

}
