import {Main, TopicPhrases} from "../../app/models/data";
import {wordGeneral} from "./general";
import {wordJobs} from "./job";
import {verbs} from "./verbs";
import {office} from "./office";
import {feelings} from "./feelings";
import {popularPhrases} from "./phrases/phrases";
import {top_Upper_Intermediate_Phrases} from "./phrases/topUpperIntermediatePhrases";


export const mainData:Main={
  data:[
    {
      id:'1',
      name: 'General',
      data:wordGeneral
    },
    {
      id:'2',
      name:'Jobs',
      data:wordJobs
    },
    {
      id:'3',
      name:'Verbs',
      data:verbs
    },
    {
      id:'4',
      name:'Office',
      data:office
    },
    {
      id:'5',
      name:'Feelings',
      data:feelings
    }
  ]

}

export const objPhrases:TopicPhrases[]=[
    {
      id:1,
      topic:'Popular',
      data:popularPhrases
    } ,
  {
      id:10,
    topic:'Top Upper-Intermediate',
      data:top_Upper_Intermediate_Phrases
    }

]
