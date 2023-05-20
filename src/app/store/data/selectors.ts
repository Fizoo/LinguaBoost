import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IData} from "./data-reducer";
import {Theme, Words} from "../../models/data";

export namespace DataSelectors {
  export const getDataState = createFeatureSelector<IData>('data');

  export const getAllState = createSelector(
    getDataState,
    (state) => state.data)

  export const getThemeById = (id: string) => createSelector(
    getAllState,
    (state) => {
      return state.filter(el => el.id === id)[0]
    }
  )

  export const getAllThemes=createSelector(
    getAllState,
    state=>{
      return state
    }
  )

  export const getRandomListWith20ById = (id: string) => createSelector(
    getThemeById(id),
    (state: Theme) => {
      const selectedList: Words[] = []
      const { data: list } = state

      const highRankList = list.filter(({level}) =>level === 3)
      const midRankList = list.filter(({level}) =>level === 2)
      const lowRankList = list.filter(({level}) =>level === 1)

      while (selectedList.length < 20 || selectedList.length === list.length) {
        let obj: Words | undefined
        let random = Math.random()

        if (highRankList.length > 0 && random < 0.10) {
          obj = highRankList.splice(Math.floor(Math.random() * highRankList.length), 1)[0]
        } else if (midRankList.length > 0 && random < 0.30) {
          obj = midRankList.splice(Math.floor(Math.random() * midRankList.length), 1)[0]
        } else if (lowRankList.length > 0 && random >= 0.3) {
          obj = lowRankList.splice(Math.floor(Math.random() * lowRankList.length), 1)[0]
        }

        if (obj) {
          selectedList.push(obj)
        }
      }
      return selectedList
    }
  )

   export const getProgressTheme=(id:string)=>createSelector(
     getThemeById(id),
     (state)=>{
       const arrLength=state.data.length
       const maxScore=arrLength*3
       const curProgress=state.data.reduce((count,item)=>count+item.level,0)-arrLength+1

       return (curProgress / maxScore) * 100
     }
   )



}
