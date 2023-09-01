export interface Progress {
  id: string
  name: string
  timeOfDay: TimeDay[]
  score: number
  countWord:number
}

export interface TimeDay {
  date: string
  counterScore: number
  countUpWordsInThisDay:number
  countMin:number
}

export interface AllTime {
  firstDay: number
  lastDay: number
}
