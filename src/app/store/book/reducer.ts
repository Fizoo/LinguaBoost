import {Book} from "../../models/book";
import {books} from "../../../assets/data/generalBook";
import {createReducer, on} from "@ngrx/store";
import {BookActions} from "./actions";

export  interface IBook{
  data:Book[]
}

const initialState:IBook={
  data:books
}

export  const bookReducer=createReducer(
  initialState,
  on(BookActions.initial,
    state=>state
    ),

)
