export interface Progress {
  id: string
  name: string
  timeOfDay: TimeDay[]
  countDays: number
  tasksCompleted: number
  score: number
}

export interface TimeDay {
  date: string
  counter: number
}

export interface AllTime {
  firstDay: number
  lastDay: number
}
