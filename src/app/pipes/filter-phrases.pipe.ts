import { Pipe, PipeTransform } from '@angular/core';
import {Phrase} from "../models/data";

@Pipe({
  name: 'filterPhrases'
})
export class FilterPhrasesPipe implements PipeTransform {

  transform(list: Phrase[], search:string=''): Phrase[] {
    if(search){
     return  list.filter(el=>el.phrase.toLowerCase().includes(search.toLowerCase()))
    }
    return list;
  }

}
