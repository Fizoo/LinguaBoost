import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IBook} from "./reducer";


export  namespace BookSelectors{

  export  const getBookState=createFeatureSelector<IBook>('book')

  export const getAllBooks=createSelector(
    getBookState,
    state=>state.data
  )

  export const getBookById=(id:number)=>createSelector(
    getAllBooks,
    (books)=>books.filter(book=>book.id===id)[0]
  )
}
