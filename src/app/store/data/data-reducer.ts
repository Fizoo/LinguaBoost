import {createReducer, on} from "@ngrx/store";
import {Theme} from "../../models/data";
import {DataActions} from "./actions";
import {mainData} from "../../../assets/data/generalData";

export interface IData {
  data: Theme[]
}

const initialState: IData = {
  data: mainData.data
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
          data:[...theme.data,word]
        } : theme)
      })
    })
)
