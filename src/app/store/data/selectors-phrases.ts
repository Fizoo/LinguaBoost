import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IData} from "./data-reducer";
import {TopicPhrases} from "../../models/data";


export namespace DataSelectorsPhrases {
  export const getDataState = createFeatureSelector<IData>('data')


  export const getAllDataOfPhrases=createSelector(
    getDataState,
    state=>state.phrases
  )

  export const getAllDataOfSentence=createSelector(
    getDataState,
    state=>state.data
  )

  export const getSentencesData=createSelector(
    getAllDataOfSentence,
    (state)=> (state.map(el=>({
      id:el.id,
      topic:el.name,
      type:'sentence',
      data:el.data.map(a=>({
        id:a.id,
        phrase:a.englishSentence,
        translateToUA:a.ukrainianTranslationOfSentence,
        idPhrase:a.idTheme
      }))
    }) ) as unknown)as TopicPhrases[]
  )

  export const getAllDataOfPhrasesOrSentence=(value:string='')=>createSelector(
    getAllDataOfPhrases,
    getSentencesData,
    (statePhrase,stateSentence)=> value === 'phrase' ? statePhrase : stateSentence
  )

  export const getPhrasesById=(id:number,value:string)=>createSelector(
    getAllDataOfPhrasesOrSentence(value),
    state=>  state.filter(el => +el.id === id)[0]
  )
}
