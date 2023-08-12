import {isDevMode} from '@angular/core';
import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {progressReducer} from "./progress/progress-reducer";
import {dataReducer, IData} from "./data/data-reducer";
import {Progress} from "../models/progress";
import {bookReducer, IBook} from "./book/reducer";

export interface State {
  progress:Progress
  data:IData
  book:IBook

}

export const reducers: ActionReducerMap<State> = {
    progress:progressReducer,
    data:dataReducer,
    book:bookReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
