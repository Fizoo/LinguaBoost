import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IData} from "./data-reducer";
import {TopicPhrases} from "../../models/data";



export namespace DataSelectorsSentences{
  export const getDataState=createFeatureSelector<IData>('data')

  export const getSentencesData=createSelector(
    getDataState,
    (state)=> (state.data.map(el=>({
      id:el.id,
      topic:el.name,
      data:el.data.map(a=>({
        id:a.id,
        phrase:a.englishSentence,
        translateToUA:a.ukrainianTranslationOfSentence,
        idPhrase:a.idTheme
      }))
    }) ) as unknown)as TopicPhrases[]
  )

  export const getSentenceData=(id:number)=>createSelector(
    getSentencesData,
    state=> {
      return   state.filter(el => +el.id === id)[0]
    }
  )




}
