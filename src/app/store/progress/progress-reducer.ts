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
  recordScore: 0,
  recordTime: 0,
  countWord: 0,
  score: 0
}

export const progressReducer = createReducer(
  initialState,
  on(ProgressAction.initial,
    state => state
  ),
  on(ProgressAction.loadProgress,
    (state, {progress}) => progress
  ),
  on(ProgressAction.loadProgressSuccess,
    state => state
  ),
  on(ProgressAction.updateRecordScore,
    (state, {record}) => {
      return record !== undefined && (state.recordScore === undefined || record > state.recordScore)
        ? { ...state, recordScore: record }
        : state;
    }
  ),
  on(ProgressAction.updateRecordTime,
    (state, {record}) => {
      return record !== undefined && (state.recordTime === undefined || record < state.recordTime)
        ? { ...state, recordTime: record }
        : state;
    }
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
            detailForWordsProgress: {
              countHigh: el.detailForWordsProgress.countHigh + progressOfDay.detailForWordsProgress.countHigh,
              countMiddle: el.detailForWordsProgress.countMiddle + progressOfDay.detailForWordsProgress.countMiddle,
              countLow: el.detailForWordsProgress.countLow + progressOfDay.detailForWordsProgress.countLow
            }
          }
          : el)

        return {
          ...state,
          score: state.score + progressOfDay.counterScore,
          countWord: state.countWord + progressOfDay.countUpWordsInThisDay,
          timeOfDay: updateDay,
          recordScore:progressOfDay.counterScore>state.recordScore?progressOfDay.counterScore:state.recordScore,
          recordTime:state.recordTime<progressOfDay.countMin?state.recordTime:progressOfDay.countMin
        }
      }
      return {
        ...state,
        timeOfDay: [...state.timeOfDay, progressOfDay],
        recordScore:state.score>progressOfDay.counterScore?state.score:progressOfDay.counterScore || 0,
        recordTime:(state?.recordTime || 100)<progressOfDay.countMin?state.recordTime:progressOfDay.countMin
      }
    })
)
