import {createReducer, on} from "@ngrx/store";
import {Progress} from "src/app/models/data";
import {ProgressAction} from "./actions";


const initialState:Progress={
    id:'',
    name:'',
    timeOfDay:[{
      date:new Date().toLocaleDateString(),
      counter:0
    }],
    countDays:0,
    tasksCompleted:0,
  score:0
}

export const progressReducer =createReducer(
  initialState,
  on(ProgressAction.initial,
    state=>state
    ),
  on(ProgressAction.AddCountDays,
    (state)=>({
    ...state,
        countDays:state.countDays+1
    })
    ),
  on(ProgressAction.UpdateTaskCompleted,
    (state,{count})=>({
      ...state,
      tasksCompleted:state.tasksCompleted+count
    })),
  on(ProgressAction.updateScore,
    (state,{count})=>({
      ...state,
      score: state.score+count
    })),
  on(ProgressAction.addNewDay,
    (state,{newDay})=>({
      ...state,
      timeOfDay: [...state.timeOfDay,newDay]
    })),
  on(ProgressAction.updateProgress,
    (state,{progress})=>({
      ...state,
      ...progress
    }))

)
