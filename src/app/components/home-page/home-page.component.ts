import {ChangeDetectionStrategy, Component} from '@angular/core';

export interface HomePages {
  id:number
  name:string
  //title:string
  img:string
  query?:string
  routing:string
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {

  homePages:HomePages[]=[
    {
      id:0,
      name:'Words',
     // title:'Go to words page and Learning English',
      img:'/assets/img/word.jpg',
      routing:'/theme/-1',
      query:'phrase'
    },
    {
      id:1,
      name:'Phrases',
      //title:'Go to words page and Learning English',
      img:'/assets/img/phrase.jpg',
      routing:'/phrases/0',
      query:'phrase'
    },
    {
      id:2,
      name:'Sentence',
      //title:'Go to words page and Learning English',
      img:'/assets/img/sente.jpg',
      routing:'/phrases/0',
      query:'sentence'
    },
    {
      id:3,
      name:'Books',
    //  title:'Go to words page and Learning English',
      img:'/assets/img/book.jpg',
      routing:'/book'
    },
    {
      id:4,
      name:'Statistic',
      //title:'Go to words page and Learning English',
      img:'/assets/img/statistic.jpg',
      routing:'/stat'
    },

  ]

}
