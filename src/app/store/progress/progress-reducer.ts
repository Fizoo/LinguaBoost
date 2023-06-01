import {createReducer, on} from "@ngrx/store";
import {ProgressAction} from "./actions";
import {Progress} from "../../models/progress";


const initialState: Progress = {
  id: '',
  name: '',
  timeOfDay: [{
    date: new Date().toLocaleDateString(),
    counter: 0
  }],
  countDays: 0,
  tasksCompleted: 0,
  score: 0
}

export const progressReducer = createReducer(
  initialState,
  on(ProgressAction.initial,
    state => state
  ),
  on(ProgressAction.AddCountDays,
    (state) => ({
      ...state,
      countDays: state.countDays + 1
    })
  ),
  on(ProgressAction.UpdateTaskCompleted,
    (state, {count}) => ({
      ...state,
      tasksCompleted: state.tasksCompleted + count
    })),
  on(ProgressAction.updateScore,
    (state, {count}) => ({
      ...state,
      score: state.score + count
    })),
  on(ProgressAction.addOrUpdateProgress,
    (state, {newDay}) => {
    let day= state.timeOfDay.find(el=>el.date===newDay.date)
      if(day){
        const sum=day.counter+newDay.counter
        const updateDay=state.timeOfDay.map(el=>el.date===day?.date? {...el,counter:sum}:el)
        return {
          ...state,
          timeOfDay: updateDay
        }
      }
      return {...state,
      timeOfDay:[...state.timeOfDay,newDay]}
    }),
  on(ProgressAction.updateProgress,
    (state, {progress}) => ({
      ...state,
      ...progress
    }))
)
