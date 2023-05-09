import {isDevMode} from '@angular/core';
import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {Progress} from "../models/data";
import {progressReducer} from "./progress/progress-reducer";
import {dataReducer, IData} from "./data/data-reducer";

export interface State {
  progress:Progress
  data:IData

}

export const reducers: ActionReducerMap<State> = {
    progress:progressReducer,
    data:dataReducer,
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
