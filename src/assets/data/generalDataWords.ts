import {Main} from "../../app/models/data";
import {wordGeneral} from "./words/general";
import {wordJobs} from "./words/job";
import {verbs} from "./words/verbs";
import {office} from "./words/office";
import {emotions} from "./words/feelings";
import {top1000} from "./words/Top1000";
import {food} from "./words/food";
import {relationships} from "./words/relationships";
import {party} from "./words/party";
import {fashion} from "./words/fashion";
import {travel} from "./words/travel";
import {family} from "./words/family";
import {city} from "./words/city";
import {game} from "./words/game";
import {IT} from "./words/IT";
import {sport} from "./words/sport";


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
      name:'Emotions and qualities',
      data:emotions
    },
    {
      id:'6',
      name:'Food',
      data:food
    },
    {
      id:'7',
      name:'Relationships',
      data:relationships
    },
    {
      id:'8',
      name:'Party',
      data:party
    },
    {
      id:'9',
      name:'Fashion',
      data:fashion
    },
    {
      id:'10',
      name:'Travel',
      data:travel
    },
    {
      id:'11',
      name:'Family',
      data:family
    },
    {
      id:'12',
      name:'City',
      data:city
    },
    {
      id:'13',
      name:'Game',
      data:game
    },
    {
      id:'14',
      name:'IT',
      data:IT
    },
    {
      id:'15',
      name:'Sport',
      data:sport
    },
  ]

}

