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
import {party} from "./phrases/party";


export const objPhrases: TopicPhrases[] = [
  {
    id: 0,
    name: 'Popular',
    data: popular,
    type:'phrase'
  },
  {
    id: 1,
    name: 'Greeting',
    data: greeting,
    type:'phrase'
  },
  {
    id: 2,
    name: 'Restaurant',
    data: restaurant,
    type:'phrase'
  },
  {
    id: 3,
    name: 'Resort',
    data: resort,
    type:'phrase'
  },
  {
    id: 4,
    name: 'Hotel',
    data: hotel,
    type:'phrase'
  },
  {
    id: 5,
    name: 'Hotel',
    data: shop,
    type:'phrase'
  },
  {
    id: 6,
    name: 'Walk',
    data: park,
    type:'phrase'
  },
  {
    id: 7,
    name: 'Office',
    data: office,
    type:'phrase'
  },
  {
    id: 8,
    name: 'Get',
    data: getPhrases,
    type:'phrase'
  },
  {
    id: 9,
    name: 'Short global',
    data: shortGlobalPhrases,
    type:'phrase'
  },
  {
    id: 10,
    name: 'Top Upper-Intermediate',
    data: top_Upper_Intermediate_Phrases,
    type:'phrase'
  },
  {
    id: 11,
    name: 'Interview',
    data: interview,
    type:'phrase'
  },
  {
    id: 12,
    name: 'Party',
    data: party,
    type:'phrase'
  },



]
