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

  export const getSelectIsFirstLoad=createSelector(
    getBookState,
    state=>state.isFirstLoad
  )

  export const hasAudioForBooks=(bookName:string)=>createSelector(
    getBookState,
    books=>{
      const findBook=books.data.find(book=>book.book_title===bookName)
      if(findBook){
        return findBook.chapters.some(chapter=>chapter.audioUrl)
      }
      return false
    }

  )

  export const getListGenres=createSelector(
    getAllBooks,
    books=>books.map(book=>({
      genre:book.genre.toUpperCase()
    })
    )
  )

  export const getListLevels=createSelector(
    getAllBooks,
    books=>books.map(book=>({
        level:book.level
      })
    )
  )
}
