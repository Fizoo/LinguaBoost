import {Book} from "../../models/book";
import {createReducer, on} from "@ngrx/store";
import {BookActions} from "./actions";

export interface IBook {
  data: Book[],
  isFirstLoad: boolean,
  isLoading: boolean,
  error: any
}

const initialState: IBook = {
  data: [],
  isFirstLoad: true,
  isLoading: false,
  error: ''
}

export const bookReducer = createReducer(
  initialState,
  on(BookActions.initial,
    state => ({
      ...state,
      isLoading:true
    })
  ),

  on(BookActions.loadBooksInProgress,
    state => ({
      ...state,
      isLoading: true,
      error: null
    })
  ),


  on(BookActions.loadBooksSuccess,
    (state,) => ({
      ...state,
      isFirstLoad:false,
      isLoading: false,
      error: null
    })
  ),

  on(BookActions.loadBooksFailure,
    (state, {error}) => ({
      ...state,
      isLoading: false,
      error
    })
  ),

  on(BookActions.addAllBooks,
    (state, {data}) => {
      const newData = data.filter(newBook => !state.data.some(existingBook => existingBook.id === newBook.id))
      return {
        ...state,
        data: [...state.data, ...newData]
      }
    }),

  on(BookActions.loadAudioForBookById,
    (state, {urlArr, name}) => ({
      ...state,
      data: state.data.map(book => {
        if (book.book_title === name) {
          const modifiedChapter = book.chapters.map((chapter, i) => ({
            ...chapter,
            audioUrl: urlArr[i]
          }))
          return ({
            ...book,
            chapters: modifiedChapter
          })
        }
        return book
      })
    })
  )
)
