import {Main} from "../../app/models/data";
import {wordGeneral} from "./words/general";
import {wordJobs} from "./words/job";
import {verbs} from "./words/verbs";
import {office} from "./words/office";
import {feelings} from "./words/feelings";
import {top1000} from "./words/Top1000";


export const mainData:Main={
  data:[
    {
      id:'0',
      name: 'Top1000',
      data:top1000
    },
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

