import {createAction, props} from "@ngrx/store";
import {HomePages} from "../../../assets/data/mainLayout/main";

export enum PageNames{
  InitialState='[Page] InitialState',
  LoadPageObj='[Page] LoadPageObj',
  LoadPageSuccess='[Page] LoadPageSuccess',
  LoadPageFailure='[Page] LoadPageFailure',
}

export namespace PageActions{

  export const initial=createAction(PageNames.InitialState)

  export const loadSuccess=createAction(PageNames.LoadPageSuccess)

  export const loadFailure=createAction(PageNames.LoadPageFailure,props<{error:any}>())

  export const loadPageObj=createAction(PageNames.LoadPageObj,props<{data:HomePages[]}>())

}
