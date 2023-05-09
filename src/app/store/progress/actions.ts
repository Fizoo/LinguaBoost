import {createAction, props} from "@ngrx/store";
import {Progress, TimeDay} from "../../models/data";

export enum ProgressNames{
  Initial='[Progress] Initial',
  GetProgress='[Progress] GetProgress',
  AddProgress='[Progress] AddProgress',
  UpdateProgress='[Progress] UpdateProgress',
  AddCountDays='[Progress] AddCountDays',
  UpdateTaskCompleted='[Progress] UpdateTaskCompleted',
  AddNewDay='[Progress] AddNewDay',
  UpdateScore='[Progress] UpdateScore'
}

export namespace ProgressAction{
  export const initial=createAction(ProgressNames.Initial)

  export const getProgress=createAction(ProgressNames.GetProgress)

  export const addProgress=createAction(ProgressNames.AddProgress,props<{progress:Progress}>())

  export const updateProgress=createAction(ProgressNames.UpdateProgress,props<{progress:Partial<Progress>}>())

  export const AddCountDays=createAction(ProgressNames.AddCountDays)

  export const UpdateTaskCompleted=createAction(ProgressNames.UpdateTaskCompleted,props<{ count:number }>())

  export const addNewDay=createAction(ProgressNames.AddNewDay,props<{newDay:TimeDay}>())

  export const updateScore=createAction(ProgressNames.UpdateScore,props<{count:number}>())
}
