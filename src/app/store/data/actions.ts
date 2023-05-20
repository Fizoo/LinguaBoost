import {createAction, props} from "@ngrx/store";
import {Theme, Words} from "../../models/data";


export enum DataNames{
  InitialState='[Data] InitialState',
  GetAllData='[Data] getAllData',
  GetDataByTheme='[Data] getDataByTheme',
  AddNewTheme='[Data] addNewTheme',
  DeleteDataByTheme='[Data] deleteDataByTheme',
  UpdateDataByTheme='[Data] updateDataByTheme',
  AddNewDataTheme='[Data] addNewDataTheme',
  UpdateWord='[Data] updateWord'
}

export namespace DataActions{
  export const initial=createAction(DataNames.InitialState)

  export const getAllData=createAction(DataNames.GetAllData)

  export const addNewTheme=createAction(DataNames.AddNewTheme,props<{topic:Theme}>())

  export const deleteDataByTheme=createAction(DataNames.DeleteDataByTheme,props<{id:string}>())

  export const updateDataByTheme=createAction(DataNames.UpdateDataByTheme,props<{word:Words}>())

  export const updateWord=createAction(DataNames.UpdateWord,props<{wordArr:Words[]}>())

}
