import {createReducer, on} from "@ngrx/store";
import {Theme, TopicPhrases} from "../../models/data";
import {DataActions} from "./actions";
import {mainData} from "../../../assets/data/generalDataWords";
import {objPhrases} from "../../../assets/data/generalDataPhrases";

export interface IData {
  data: Theme[]
  phrases: TopicPhrases[]
}

const initialState: IData = {
  data: mainData.data,
  phrases: objPhrases
}

export const dataReducer = createReducer(
  initialState,
  on(DataActions.initial,
    state => state
  ),
  on(DataActions.addNewTheme,
    (state, {topic}) => ({
      ...state,
      data: [...state.data, topic]
    })),

  on(DataActions.deleteTopicById,
    (state, {topic}) => {

      //const { data, phrases } = state;
      const {type, id} = topic;
      if (type === 'word') {
        return ({
          ...state,
          data: state.data.filter(theme => theme.id !== id)
        })
      } else return ({
        ...state,
        phrases: state.phrases.filter(theme => String(theme.id) !== id)
      })
    }
  ),

  on(DataActions.deleteItemWithTopicById,
    (state, {item}) => {
      const {type, id,idTopic} = item;

      console.log(type)
      //debugger
      if (type === 'word') {
        return ({
          ...state,
          data: state.data.map(el=>el.id===String(idTopic)?{
            ...el,
            data:el.data.filter(a=>a.id!==id)
          }:el)
        })
      } else return ({
        ...state,
        phrases: state.phrases.map(el=>el.id===idTopic?{
          ...el,
          data:el.data.filter(a=>a.id!==id)
        }:el)
      })
    }
  ),

  on(DataActions.updateDataByTheme,
    (state, {word}) => {
      return ({
        ...state,
        data: state.data.map(theme => +theme.id === word.idTheme ? {
          ...theme,
          data: [...theme.data, word]
        } : theme)
      })
    }),

  on(DataActions.updateWord,
    (state, {wordArr}) => {

      let findWords = state.data.find(({id}) => id === wordArr[0].idTheme.toString())?.data || []

      const newData = findWords.map(obj1 => {
        const obj2 = wordArr.find(({id}) => id === obj1.id)
        if (obj2) {
          return {
            ...obj1,
            level: obj2.level
          }
        }
        return obj1
      })

      return {
        ...state,
        data: state.data.map(el => el.id === wordArr[0].idTheme.toString() ? {
            ...el,
            data: newData
          }
          : el)
      }

    }
  )
)
