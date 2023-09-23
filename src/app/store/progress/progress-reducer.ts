import {createReducer, on} from "@ngrx/store";
import {ProgressAction} from "./actions";
import {Progress} from "../../models/progress";
import {getCurrentDate} from "../../helper/fn";



const initialState: Progress = {
  id: '',
  name: '',
  timeOfDay: [{
    date: getCurrentDate(),
    counterScore: 0,
    countUpWordsInThisDay: 0,
    countMin: 0,
    detailForWordsProgress: {
      countHigh: 0,
      countMiddle: 0,
      countLow: 0
    }
  }],
  countWord: 0,
  score: 0
}

export const progressReducer = createReducer(
  initialState,
  on(ProgressAction.initial,
    state => state
  ),
  on(ProgressAction.loadProgress,
    (state,{progress})=>progress
    ),
  on(ProgressAction.loadProgressSuccess,
    state=>state
    ),


  on(ProgressAction.updateProgress,
    (state, {progressOfDay}) => {
      const oldDay = state.timeOfDay.find(el => el.date === progressOfDay.date)

      if (oldDay) {
        //  const sum=day.counter+newDay.counter
        const updateDay = state.timeOfDay.map(el => el.date === progressOfDay.date ? {
            ...el,
            counterScore: el.counterScore + progressOfDay.counterScore,
            countUpWordsInThisDay: el.countUpWordsInThisDay + progressOfDay.countUpWordsInThisDay,
            countMin: el.countMin + progressOfDay.countMin,
            detailForWordsProgress:{
              countHigh: el.detailForWordsProgress.countHigh+progressOfDay.detailForWordsProgress.countHigh,
              countMiddle: el.detailForWordsProgress.countMiddle+progressOfDay.detailForWordsProgress.countMiddle,
              countLow: el.detailForWordsProgress.countLow+progressOfDay.detailForWordsProgress.countLow
            }
          }
          : el)

        return {
          ...state,
          score: state.score + progressOfDay.counterScore,
          countWord: state.countWord + progressOfDay.countUpWordsInThisDay,
          timeOfDay: updateDay
        }
      }
      return {
        ...state,
        timeOfDay: [...state.timeOfDay, progressOfDay]
      }
    })

)
