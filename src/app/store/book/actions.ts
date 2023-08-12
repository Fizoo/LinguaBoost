import {createAction} from "@ngrx/store";

export enum BookNames{
  InitialState='[Book] InitialState',
  AddBook='[Book] AddBook',

}

export namespace BookActions{

  export  const initial=createAction(BookNames.InitialState)
}
