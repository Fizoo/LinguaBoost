import {TopicPhrases} from "../../app/models/data";
import {popular} from "./phrases/popular";
import {getPhrases} from "./phrases/get";
import {shortGlobalPhrases} from "./phrases/shortGlobalPhrases";
import {top_Upper_Intermediate_Phrases} from "./phrases/topUpperIntermediatePhrases";

export const objPhrases: TopicPhrases[] = [
  {
    id: 1,
    topic: 'Popular',
    data: popular,
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


]
