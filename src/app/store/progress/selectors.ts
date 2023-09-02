import {createFeatureSelector, createSelector} from "@ngrx/store";
import {Progress} from "../../models/progress";
import {getCurrentDate} from "../../helper/fn";

export namespace ProgressSelectors {
  export const getProgressState=createFeatureSelector<Progress>('progress')

  export const getAllProgress=createSelector(
    getProgressState,
    state=>state
  )

  export const getProgressByThisDay=createSelector(
    getAllProgress,
    progress=>{
      const day=progress.timeOfDay.find(el=>el.date===getCurrentDate())
      return day || null
    }
  )

}
