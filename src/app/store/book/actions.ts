import {createAction, props} from "@ngrx/store";
import {Book} from "../../models/book";

export enum BookNames{
  InitialState='[Book] InitialState',
  AddAllBook='[Book] AddBook',
  InitialLoadAudioForBookById='[Book] InitialLoadAudioForBookById',
  LoadAudioForBookById='[Book] LoadAudioForBookById',
  LoadBooksSuccess='[Book] LoadBooksSuccess',
  LoadBooksFailure='[Book] LoadBooksFailure ',
  LoadBooksInProgress='[Book] LoadBooksInProgress',
}

export namespace BookActions{

  export  const initial=createAction(BookNames.InitialState)

  export const loadBooksInProgress=createAction(BookNames.LoadBooksInProgress)

  export const loadBooksSuccess=createAction(BookNames.LoadBooksSuccess)

  export const loadBooksFailure = createAction(BookNames.LoadBooksFailure,props<{error:any}>());

  export const addAllBooks=createAction(BookNames.AddAllBook,props<{data:Book[] }>())

  export const initialLoadAudioForBookById=createAction(BookNames.InitialLoadAudioForBookById,props<{bookName:string}>())

  export const loadAudioForBookById=createAction(BookNames.LoadAudioForBookById,props<{urlArr:string[],name:string}>())
}
