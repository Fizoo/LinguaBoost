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
import {up} from "./phrases/up";
import {out} from "./phrases/out";
import {On} from "./phrases/on";
import {away} from "./phrases/away";
import {back} from "./phrases/back";
import {down} from "./phrases/down";
import {forward} from "./phrases/forward";
import {In} from "./phrases/in";
import {Off} from "./phrases/off";
import {over} from "./phrases/over";


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
    name: 'Shop',
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
  {
    id: 13,
    name: 'UP',
    data: up,
    type:'phrase'
  },
  {
    id: 14,
    name: 'DOWN',
    data: down,
    type:'phrase'
  },
  {
    id: 15,
    name: 'AWAY',
    data: away,
    type:'phrase'
  },
  {
    id: 16,
    name: 'IN',
    data: In,
    type:'phrase'
  },
  {
    id: 17,
    name: 'ON',
    data: On,
    type:'phrase'
  },
  {
    id: 18,
    name: 'OFF',
    data: Off,
    type:'phrase'
  },
  {
    id: 19,
    name: 'OUT',
    data: out,
    type:'phrase'
  },
  {
    id: 20,
    name: 'OVER',
    data: over,
    type:'phrase'
  },
  {
    id: 21,
    name: 'BACK',
    data: back,
    type:'phrase'
  },
  {
    id: 22,
    name: 'FORWARD',
    data: forward,
    type:'phrase'
  },






]
