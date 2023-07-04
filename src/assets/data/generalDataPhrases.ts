import {TopicPhrases} from "../../app/models/data";
import {popular} from "./phrases/popular";
import {getPhrases} from "./phrases/get";
import {shortGlobalPhrases} from "./phrases/shortGlobalPhrases";
import {top_Upper_Intermediate_Phrases} from "./phrases/topUpperIntermediatePhrases";
import {greeting} from "./phrases/greeting";
import { restaurant } from "./phrases/restourant";
import {resort} from "./phrases/resort";
import {hotel} from "./phrases/hotel";
import {shop} from "./phrases/shop";
import {park} from "./phrases/park";
import {office} from "./phrases/office";
import {interview} from "./phrases/interview";


export const objPhrases: TopicPhrases[] = [
  {
    id: 0,
    topic: 'Popular',
    data: popular,
    type:'phrase'
  },
  {
    id: 1,
    topic: 'Greeting',
    data: greeting,
    type:'phrase'
  },
  {
    id: 2,
    topic: 'Restaurant',
    data: restaurant,
    type:'phrase'
  },
  {
    id: 3,
    topic: 'Resort',
    data: resort,
    type:'phrase'
  },
  {
    id: 4,
    topic: 'Hotel',
    data: hotel,
    type:'phrase'
  },
  {
    id: 5,
    topic: 'Hotel',
    data: shop,
    type:'phrase'
  },
  {
    id: 6,
    topic: 'Walk',
    data: park,
    type:'phrase'
  },
  {
    id: 7,
    topic: 'Office',
    data: office,
    type:'phrase'
  },
  {
    id: 8,
    topic: 'Get',
    data: getPhrases,
    type:'phrase'
  },
  {
    id: 9,
    topic: 'Short global',
    data: shortGlobalPhrases,
    type:'phrase'
  },
  {
    id: 10,
    topic: 'Top Upper-Intermediate',
    data: top_Upper_Intermediate_Phrases,
    type:'phrase'
  },
  {
    id: 11,
    topic: 'Interview',
    data: interview,
    type:'phrase'
  },



]
