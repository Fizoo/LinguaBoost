export interface StatisticData {
  id: string; // Індекс тиждня в році
  counterScore: number;
  countUpWordsInThisDay: number;
  countMin: number;
  countHigh: number;
  countMiddle: number;
  countLow: number;
  dayName?:string
}

export interface Diagram {
  level: string;
  count: number;
}

export interface TimeDayDiagram {
  date: string
  countHigh: number | undefined
  countMiddle: number | undefined
  countLow: number | undefined
}
