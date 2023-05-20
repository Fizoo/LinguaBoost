import {Main, Theme} from "../../app/models/data";
import {wordGeneral} from "./general";
import {wordJobs} from "./job";
import { verbs } from "./verbs";
import {office} from "./office";
import {feelings} from "./feelings";



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
