import {Main, Theme} from "../../app/models/data";
import {wordGeneral} from "./general";
import {wordJobs} from "./job";
import { verbs } from "./verbs";



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
    }
  ]
}
