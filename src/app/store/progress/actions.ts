import {createAction, props} from "@ngrx/store";
import {Progress, TimeDay} from "../../models/progress";

export enum ProgressNames{
  Initial='[Progress] Initial',
  LoadProgress='[Progress] LoadProgress',
  LoadProgressSuccess='[Progress] LoadProgressSuccess',
  GetProgress='[Progress] GetProgress',
  AddProgress='[Progress] AddProgress',
  UpdateProgress='[Progress] UpdateProgress',
  AddCountDays='[Progress] AddCountDays',
  UpdateTaskCompleted='[Progress] UpdateTaskCompleted',
  AddOrUpdateProgress='[Progress] AddOrUpdateProgress',
  UpdateScore='[Progress] UpdateScore',
  UpdateRecordScore='[Progress] UpdateScore',
  UpdateRecordTime='[Progress] UpdateScore'
}

export namespace ProgressAction{
  export const initial=createAction(ProgressNames.Initial)

  export const loadProgress=createAction(ProgressNames.LoadProgress,props<{progress:Progress}>())

  export const loadProgressSuccess=createAction(ProgressNames.LoadProgressSuccess)

  export const getProgress=createAction(ProgressNames.GetProgress)

  export const addProgress=createAction(ProgressNames.AddProgress,props<{progress:Progress}>())

  export const updateProgress=createAction(ProgressNames.UpdateProgress,props<{progressOfDay:TimeDay}>())

  export const AddCountDays=createAction(ProgressNames.AddCountDays)

  export const UpdateTaskCompleted=createAction(ProgressNames.UpdateTaskCompleted,props<{ count:number }>())

  export const addOrUpdateProgress=createAction(ProgressNames.AddOrUpdateProgress,props<{newDay:TimeDay}>())

  export const updateScore=createAction(ProgressNames.UpdateScore,props<{count:number}>())

  export const updateRecordScore=createAction(ProgressNames.UpdateRecordScore,props<{record:number}>())

  export const updateRecordTime=createAction(ProgressNames.UpdateRecordTime,props<{record:number}>())
}
