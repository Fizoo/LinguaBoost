import {createAction, props} from "@ngrx/store";
import {CollectTopic, CollectTopicItem, Theme, TopicPhrases, Words} from "../../models/data";


export enum DataNames{
  InitialState='[Data] InitialState',
  LoadData='[Data] LoadData',
  LoadDataPhrases='[Data] LoadDataPhrases',
  LoadDataError='[Data] LoadDataError',
  LoadDataSuccess='[Data] LoadDataSuccess',
  GetAllData='[Data] getAllData',
  GetDataByTheme='[Data] getDataByTheme',
  AddNewTheme='[Data] addNewTheme',
  DeleteTopicById='[Data] deleteItemById',
  DeleteItemWithTopicById='[Data] deleteItemWithTopicById',
  UpdateDataByTheme='[Data] updateDataByTheme',
  AddNewDataTheme='[Data] addNewDataTheme',
  UpdateWord='[Data] updateWord'
}

export namespace DataActions{
  export const initial=createAction(DataNames.InitialState)

  export const loadData=createAction(DataNames.LoadData,props<{data:Theme[]}>())

  export const loadDataPhrases=createAction(DataNames.LoadDataPhrases,props<{phrases:TopicPhrases[]}>())

  export const loadDataError=createAction(DataNames.LoadDataError,props<{error:any}>())

  export const loadDataSuccess=createAction(DataNames.LoadDataSuccess)

  export const getAllData=createAction(DataNames.GetAllData)

  export const addNewTheme=createAction(DataNames.AddNewTheme,props<{topic:Theme}>())

  export const deleteItemWithTopicById=createAction(DataNames.DeleteItemWithTopicById,props<{item:CollectTopicItem}>())

  export const deleteTopicById=createAction(DataNames.DeleteTopicById,props<{topic:CollectTopic}>())

  export const updateDataByTheme=createAction(DataNames.UpdateDataByTheme,props<{word:Words}>())

  export const updateWord=createAction(DataNames.UpdateWord,props<{wordArr:Words[]}>())

}
