import {createFeatureSelector, createSelector} from "@ngrx/store";
import {Progress} from "../../models/progress";

export namespace ProgressSelectors {
  export const getProgressState=createFeatureSelector<Progress>('progress')

  export const getAllProgress=createSelector(
    getProgressState,
    state=>state
  )

}
