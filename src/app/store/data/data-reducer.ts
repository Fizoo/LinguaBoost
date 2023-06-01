import {createReducer, on} from "@ngrx/store";
import {Theme, TopicPhrases} from "../../models/data";
import {DataActions} from "./actions";
import {mainData, objPhrases} from "../../../assets/data/generalData";

export interface IData {
  data: Theme[]
  phrases:TopicPhrases[]
}

const initialState: IData = {
  data: mainData.data,
  phrases:objPhrases
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
  on(DataActions.deleteDataByTheme,
    (state, {id}) => ({
      ...state,
      data: state.data.filter(el => el.id !== id)
    })),
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
