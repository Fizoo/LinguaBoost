

export interface HomePages {
  id:number
  name:string
  //title:string
  img:string
  query?:string
  routing:string
}


export const homePages:HomePages[]=[
  {
    id:0,
    name:'Words',
    // title:'Go to words page and Learning English',
    img:'',
    routing:'/theme/-1',
    query:'phrase'
  },
  {
    id:1,
    name:'Phrases',
    //title:'Go to words page and Learning English',
    img:'',
    routing:'/phrases/0',
    query:'phrase'
  },
  {
    id:2,
    name:'Sentence',
    //title:'Go to words page and Learning English',
    img:'',
    routing:'/phrases/0',
    query:'sentence'
  },
  {
    id:3,
    name:'Books',
    //  title:'Go to words page and Learning English',
    img:'',
    routing:'/book'
  },
  {
    id:4,
    name:'Statistic',
    //title:'Go to words page and Learning English',
    img:'',
    routing:'/stat'
  },

]
