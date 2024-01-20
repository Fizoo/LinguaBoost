export interface Progress {
  id: string
  name: string
  timeOfDay: TimeDay[]
  score: number
  countWord:number
  recordScore:number
  recordTime:number
}

export interface TimeDay {
  date: string
  counterScore: number
  countUpWordsInThisDay:number
  countMin:number
  detailForWordsProgress:DetailProgress
  dayName?:string

}
export interface DetailProgress{
  countHigh:number
  countMiddle:number
  countLow:number
}

export interface AllTime {
  firstDay: number
  lastDay: number
}

