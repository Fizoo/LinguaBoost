import {Main, Theme} from "../../app/models/data";
import {wordGeneral} from "./general";
import {wordJobs} from "./job";



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
    }
  ]
}
